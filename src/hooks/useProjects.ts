import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'

export type Project = {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  imageUrl: string
  year: string
  content?: string
  images?: string[]
}

type UseProjectsOptions = {
  category?: string
  limit?: number
}

/**
 * Custom hook to fetch projects from Firebase
 */
export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)

        let projectsQuery = collection(db, 'projects')
        let constraints = []

        if (options.category && options.category !== 'All') {
          constraints.push(where('category', '==', options.category))
        }

        constraints.push(orderBy('year', 'desc'))

        const querySnapshot = await getDocs(query(projectsQuery, ...constraints))
        let fetchedProjects = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() } as Project
        })

        if (options.limit && fetchedProjects.length > options.limit) {
          fetchedProjects = fetchedProjects.slice(0, options.limit)
        }

        setProjects(fetchedProjects)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err instanceof Error ? err : new Error('Unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [options.category, options.limit])

  return { projects, loading, error }
}
