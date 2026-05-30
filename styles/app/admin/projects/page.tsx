import { getProjects } from '@/lib/actions'
import { ProjectsManager } from '@/components/admin/projects-manager'

export default async function AdminProjectsPage() {
  const projects = await getProjects()
  
  return <ProjectsManager projects={projects} />
}
