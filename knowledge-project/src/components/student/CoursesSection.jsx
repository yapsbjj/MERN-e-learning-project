import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import  CourseCard  from './CourseCard'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Apprendre des meilleurs ! </h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Découvrer nos cours les plus populaires de différentes catégories.
         De coder en passant par la musique ou apprendre a cuisiner comme un chef,
         notre pédagogie est affuter pour libérer tout votre potentiel !</p>

        <div className='grid grid-cols-4 px-4 md:my-16 my-10 gap-4'>
          {allCourses.slice(0,4).map((course, index)=> <CourseCard key={index} course={course}/>)}
        </div>

         <Link to={'/course-list'} onClick={()=> scrollTo(0,0)} 
         className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>
         Voir tous les cours</Link>
    </div>
  )
}

export default CoursesSection
