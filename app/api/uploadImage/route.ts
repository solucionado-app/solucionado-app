// pages/api/upload.ts

import  { v2 as cloudinary }  from 'cloudinary';
import {  type NextRequest, NextResponse } from 'next/server';
import { prisma } from "~/server/db";

import { existsSync, promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';


// disable



// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type fileDataI = {
    serviceRequestId: string,
    photos: string[],
    portrait: string,
}
export type formDataI = {
    fields:{
        serviceRequestId: string,
    }
    files: {
        photos: File[],
        portrait: File,
    }

}

async function handler(req: NextRequest) {
    const { method } = req;

    if (method === 'POST') {

        try{
            console.log(req)
            // Convert the file data to a buffer
            const data = await req.formData()
            console.log(data)

            const portrait: File | null = data.get('portrait') as unknown as File
            const photosFile: File[] | null = data.getAll('photos') as unknown as File[]
            const serviceRequestId = data.get('serviceRequestId') as unknown as string

            let portraitprisma;
            if (portrait && /^image\//.test(portrait.type)) {
                const buffer = Buffer.from(await portrait.arrayBuffer());
                const tmpFilePathPortrait = join(tmpdir(), portrait.name);
                await fs.writeFile(tmpFilePathPortrait, buffer);
                const portraitUploadResponse = await cloudinary.uploader.upload(tmpFilePathPortrait, {
                    unique_filename: true,
                    folder: `serviceRequests/${serviceRequestId}/portrait/`,
                    use_asset_folder_as_public_id_prefix: true,
                    public_id: serviceRequestId + "-portrait",
                    invalidate: true,
                });
                const portraiturl = portraitUploadResponse.secure_url;
                portraitprisma = await prisma.photoMeta.upsert({
                    where: {
                        id: portraitUploadResponse.public_id,
                        serviceRequestId: serviceRequestId,
                    },
                    update: {
                        url: portraiturl,
                    },
                    create: {
                        ServiceRequest: {
                            connect: {
                                id: serviceRequestId,
                            }
                        },
                        serviceRequestPortrait: {
                            connect: {
                                id: serviceRequestId,
                            }
                        },
                        url: portraiturl,
                    },
                });
                const exists = existsSync(tmpFilePathPortrait);
                if (exists) {
                    await fs.unlink(tmpFilePathPortrait);
                    console.log(`File deleted: ${tmpFilePathPortrait}`);
                } else {
                    console.log(`File does not exist: ${tmpFilePathPortrait}`);
                }
            }

            let photosprisma: { id: string; createdAt: Date; updatedAt: Date; url: string; serviceRequestId: string; serviceRequestPortraitId: string | null; }[] = [];
            if (photosFile && photosFile.every(photo => /^image\//.test(photo.type))) {
                const buffersPhotosUrl = await Promise.all(photosFile.map(async (photo) => {
                    const buffer = Buffer.from(await photo.arrayBuffer());
                    const tmpFilePathPhoto = join(tmpdir(), photo.name);
                    await fs.writeFile(tmpFilePathPhoto, buffer);
                    return tmpFilePathPhoto;
                }));

                const photos = await Promise.all(buffersPhotosUrl.map(async (photo, i) => {
                    const uploadResponse = await cloudinary.uploader.upload(photo, {
                        image_metadata: true,
                        folder: `serviceRequests/${serviceRequestId}/photos/`,
                        use_asset_folder_as_public_id_prefix: true,
                        public_id: `${serviceRequestId}-${i}`,
                        invalidate: true,
                    });
                    return uploadResponse;
                }));

                photosprisma = await Promise.all(photos.map(async (photo) => {
                    const photoMeta = await prisma.photoMeta.upsert({
                        where: {
                            id: photo.public_id,
                            serviceRequestId: serviceRequestId,
                        },
                        update: {
                            url: photo.secure_url,
                        },
                        create: {
                            ServiceRequest: {
                                connect: {
                                    id: serviceRequestId,
                                }
                            },
                            url: photo.secure_url,
                        },
                    });
                    return photoMeta;
                }));

                await Promise.all(buffersPhotosUrl.map(async (photo) => {
                    const exists = existsSync(photo);
                    if (exists) {
                        await fs.unlink(photo);
                        console.log(`File deleted: ${photo}`);
                    } else {
                        console.log(`File does not exist: ${photo}`);
                    }
                }));
            }

            const request = await prisma.serviceRequest.update({
                where: {
                    id: serviceRequestId,
                },
                data: {
                    ...(portraitprisma && {
                        portrait: {
                            connect: {
                                id: portraitprisma.id,
                            },
                        },
                    }),
                    ...(photosprisma.length > 0 && {
                        photos: {
                            connect: photosprisma.map((photo) => ({ id: photo.id })),
                        },
                    }),
                },
                select: {
                    portrait: true,
                    photos: true,
                }
            });

        return NextResponse.json({photos: request.photos, portrait: request.portrait}, { status: 200 });
        }
        catch(e){
            console.log(e)
            return NextResponse.json({ error: e }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;