import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AppContext} from '../../context/AppContext'
import { assets } from '../../assets/assets'
import  Loading  from '../../components/student/Loading'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import Youtube from 'react-youtube'
import Rating from '../../components/student/Rating'
import { toast } from 'react-toastify'

const Player = () => {

const {id} = useParams()

const [courseData, setCourseData] = useState(null)
const [openSection, setOpenSection] = useState({})
const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
const [playerData, setPlayerData] = useState(null)

const { enrolledCourses, allCourses, calculateRating, calculateNoOfLecture,
  calculateCourseDuration, calculateChapterTime, currency, backendUrl,
  getToken, userData, fetchEnrolledCourses, fetchUserEnrolledCourses
} = useContext(AppContext)

const[progresData, setProgressData] = useState(null)
const [initialRating, setInitialRating] = useState(0)

const fetchCourseData = async ()=>{
 const findCourse = allCourses.find(course => course._id === id)
 setCourseData(findCourse);
course.courseRating.map(()=>{
  if(item.userId === userData._id){
    setInitialRating(item.rating)
  }
}) 
}

useEffect(()=>{
  if(fetchEnrolledCourses.length > 0){
  fetchCourseData()
}
},[enrolledCourses])

const markLectureAsCompleted = async (lectureId)=>{
  try {
    const token = await getToken()
    const { data } = await axios.post(backendUrl + '/api/user/update-couorse-progress', {courseId, lectureId}, { headers: {Authorization: `Bearer ${token}`}})

    if(data.success){
      toast.success(data.message)
      getCourseProgress()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const getCourseProgress = async ()=>{
  try {
    const token = await getToken()
    const { data } = await axios.post(backendUrl + '/api/user/get-course-progress', {courseId}, { headers: {Authorization: `Bearer ${token}`}})

    if(data.success){
      setProgressData(data.progressData)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const handleRate = async (rating)=>{
  try {
    const token = await getToken()
    const { data } = await axios.post(backendUrl + '/api/user/add-rating', {courseId, rating}, { headers: {Authorization: `Bearer ${token}`}})

    if(data.success){
      toast.success(data.success)
      fetchUserEnrolledCourses()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
  getCourseProgress()
}, [])

const toggleSection = (index)=>{
setOpenSection((prev)=>(
  {...prev,
    [index]: !prev[index],
  }
));
}; 

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start
justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

  <div className='absolute top-0 left-0 w-full h-500 -z-1
  bg-gradient-to-b from-cyan-100/70'>

  </div>
      
{/* colonne de gauche */}
<div className='max-w-xl z-10 text-gray-500'>
    <h1 className='font-semibold text-gray-800'>{courseData.courseTitle}</h1>
    <p className='pt-4 md:text-base text-sm' 
     dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p><br/>

    <p className='text-sm'>Ce cours vous est proposé par <span className='text-blue-600 underline'>Yaps</span></p>

      <div className='pt-8 text-gray-800'>
        <h2 className='text-xl font-semibold'>Programme du cours</h2>
        
        <div className='pt-5'>
          {courseData.courseContent.map((chapter, index)=> (
            <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
              <div className='flex items-center justify-between px-4 py-3
              cursor-pointer select-none' onClick={()=> toggleSection(index)}>
                <div className='flex items-center gap-2'>
                  <img className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                   src={assets.down_arrow_icon} alt="arrow icon" />
                  <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                </div>
                <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
              </div>
                <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'} `}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border -T border-gray-300'>
                    {chapter.chapterContent.map((lecture, i)=> (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={progresData && progresData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className='w-4
                        h-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && <p
                            onClick={()=> setPlayerData({
                              videoId: lecture.lectureUrl.split('/').pop()
                            })} className='text-blue-500
                            cursor-pointer'>Regarder la vidéo</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units: ['h', 'm']})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

            </div>
          ))}
        </div>

      </div>

      <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-800'>Description du cours</h3>
          <p className='pt-3 rich-text ' 
     dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>

      </div>

</div>
{/* colonne de droite */}
<div className='max-w-[424px] z-10 rounded-t md:
rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>

  <button onClick={()=>markLectureAsCompleted(playerData.lectureId)}
   className='text-blue-600'>{progresData && progresData.lectureCompleted.includes(playerData.lectureId) ? 'completed' : 'Mark Complete'}
   </button>

{/* Remplacer l'image par la vidéo */}
{
  playerData ?
  <Youtube videoId={playerData.videoId} opts={{playerVars: {autoplay: 1}}} iframeClassName='w-full aspect-video'/>

  :  <img src={courseData.courseThumbnail} alt="" />
}

  

    <div className='flex items-center text-sm md:text-default gap-4 pt-2
    md:pt-4 text-gray-500'>

      <div className='flex items-center gap-1'>
        <img src={assets.star} alt="star icon" />
        <p>{calculateRating(courseData)}</p>
      </div>
      
      <div className='h-4 w-px bg-gray-500/40'></div>

      <div className='flex items-center gap-1'>
        <img src={assets.time_clock_icon} alt="clock icon" />
        <p>{calculateCourseDuration(courseData)}</p>
      </div>

      <div className='h-4 w-px bg-gray-500/40'></div>

      <div className='flex items-center gap-1'>
        <img src={assets.lesson_icon} alt="lesson icon" />
        <p>{calculateNoOfLecture(courseData)} leçons</p>
      </div>

      

    </div>

    <div className='flex flex items-center gap-2 py-3 mt-10'>
        <h1 className='text-xl font-bold'>Noter ce cours :</h1>
        <Rating initialRating={initialRating} onRate={handleRate}/>
      </div>

  
    
   

  </div>
</div>

    
    <Footer/>
    </>
  ) : <Loading />
}

export default Player
