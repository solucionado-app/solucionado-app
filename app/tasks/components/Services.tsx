"use client"

import ServicesTable from '@/src/components/servicesComponents/AllServicesTable'
import Spinner from '@/src/components/ui/spinner'
import { api } from '@/src/utils/api'
import { useOrganization, useUser } from '@clerk/nextjs'
import { map } from '@trpc/server/observable'
import React from 'react'
import { ServiceDataTable } from './service-data-table'
import { serviceColumns } from './service-columns'

export default function Services() {
    const { user, isSignedIn, isLoaded } = useUser()
    console.log(user?.organizationMemberships)
    const userIsAdmin = user?.organizationMemberships?.some((org) => org.organization.slug === 'admin')

    console.log(userIsAdmin)
    const {
        data: services,
        isLoading,
        isFetched,
        isError,
    } = api.service.getEvery.useQuery(undefined, {
        staleTime: 1000 * 60 * 5,
    })


    return (
        <>
            {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
            {isError && <div>Error</div>}
            {!!services && <ServiceDataTable columns={serviceColumns} data={services} />}
            {isFetched && !services && (
                <div className="text-2xl">No hay servicios</div>
            )}
        </>
    )
}
