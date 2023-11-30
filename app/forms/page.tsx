"use client"

import { Separator } from "@/app/ui/separator"
import { ProfileForm } from "@/app/forms/profile-form"
import { serverClient } from "../_trpc/serverClient";
import { api } from "@/src/utils/api";

export default function SettingsProfilePage() {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
