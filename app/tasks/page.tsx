
import { promises as fs } from "fs"
import path from "path"
import { type Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import { api } from "@/src/utils/api"
import Services from "./components/Services"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/tasks/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}



export default async function TaskPage() {
  const tasks = await getTasks()
  return (
    <>

      <div className=" md:rounded-[0.5rem] md:border md:bg-background md:shadow h-full flex-1 flex-col space-y-8 p-2 md:p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <Services />
        {/* <DataTable columns={columns} data={tasks} /> */}
      </div>
    </>
  )
}
