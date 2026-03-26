'use client'

import { useState } from 'react'
import { Search, Filter, BookOpen, User, Clock, MapPin, Star } from 'lucide-react'
import { Course } from '../types'

interface CourseListingProps {
  initialCourses: Course[]
}

export function CourseListing({ initialCourses }: CourseListingProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredCourses = initialCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.code.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || course.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black font-headline text-primary tracking-tighter">Catalogue des Cours</h2>
          <p className="text-on-surface-variant font-medium opacity-70">Explorez et gérez vos modules académiques.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
            <input 
              type="text"
              placeholder="Rechercher un cours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
            />
          </div>
          <button className="p-4 rounded-2xl bg-white border border-outline-variant/10 text-primary hover:bg-surface-container-low transition-all">
            <Filter className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border border-outline-variant/5 hover:scale-[1.02] active:scale-98 transition-all flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={course.image || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800`} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                {course.category}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">{course.code}</span>
                <h3 className="text-xl font-black font-headline text-on-surface mt-1 leading-tight group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <User className="h-4 w-4 opacity-40" />
                  {course.instructor.name}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <Clock className="h-4 w-4 opacity-40" />
                  {course.schedule}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <MapPin className="h-4 w-4 opacity-40" />
                  {course.location}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-outline-variant/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-black">{course.credits} ECTS</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:underline underline-offset-4">
                  Détails du module
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
