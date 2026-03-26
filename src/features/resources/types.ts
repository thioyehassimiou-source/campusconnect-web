export type FileType = 'pdf' | 'ppt' | 'mp4' | 'fig' | 'doc'

export interface CourseFolder {
  id: string
  name: string
  description: string
  documentCount: number
  fileTypes: FileType[]
}

export interface ResourceFile {
  id: string
  name: string
  course: string
  category: string
  addedAt: string
  size: string
  type: FileType
}
