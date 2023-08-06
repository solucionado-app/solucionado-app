import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { MapPin, StarHalfIcon, StarIcon, VerifiedIcon } from "lucide-react";
import { calculateAge } from "~/helpers/birthDate";
import type { Profile } from "../types/solucionador";

interface SolucionadorProfileCardProps {
  profile: Profile;
}
export const SolucionadorProfileCard: React.FC<
  SolucionadorProfileCardProps
> = ({ profile }) => {
  const { first_name, last_name, image_url, address } = profile;
  return (
    <div className="min-h-[15rem] w-full rounded border border-gray-300">
      <div className="h-[8rem] w-full rounded-t bg-gray-200" />
      <div className=" mb-4 flex w-full flex-col items-center gap-4 p-4  md:flex-row md:items-center">
        <Avatar className="-mt-12 h-28 w-28 object-cover md:h-36 md:w-36">
          <AvatarImage src={image_url || ""} />
        </Avatar>
        <div className="flex w-full flex-col gap-4 sm:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <h2 className="text-center text-xl font-bold tracking-tight">
                  {first_name} {last_name}
                </h2>
                <VerifiedIcon className="text-xl text-sol_lightBlue" />
              </div>
              <div className="flex items-center gap-2 uppercase">
                <MapPin className="text-sol_lightBlue" />
                {address}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="text-solYellow" />
              <p className="font-bold">5.0</p>
              <p>(129 reseñas)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
