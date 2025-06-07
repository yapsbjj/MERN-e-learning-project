import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import Youtube from 'react-youtube'
import Rating from '../../components/student/Rating'
import { toast } from 'react-toastify'
import axios from 'axios'

const Player = () => {
  const { id } = useParams()
  const courseId = id

  const [courseData, setCourseData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progresData, setProgressData] = useState(null)
  const [initialRating, setInitialRating] = useState(0)

  const {
    enrolledCourses,
    calculateRating,
    calculateNoOfLecture,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    backendUrl,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useContext(AppContext)

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`)

      if (data.success) {
        setCourseData(data.courseData)

        // Initialiser la note utilisateur si elle existe
        const userRating = data.courseData.courseRatings.find(
          (item) => item.userId === userData?._id
        )
        if (userRating) {
          setInitialRating(userRating.rating)
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      fetchCourseData()
    }
  }, [enrolledCourses])

  useEffect(() => {
    getCourseProgress()
  }, [])

  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-course-progress`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setProgressData(data.progressData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getCourseProgress()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRate = async (rating) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.success)
        fetchUserEnrolledCourses()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
        <div className='absolute top-0 left-0 w-full h-500 -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        {/* colonne de gauche */}
        <div className="flex-1 text-gray-800 space-y-6">
  <h1 className="text-2xl font-semibold">{courseData.courseTitle}</h1>

  <div
    className="text-sm text-gray-600 leading-relaxed"
    dangerouslySetInnerHTML={{
      __html: courseData.courseDescription.slice(0, 200),
    }}
  ></div>

  <p className="text-sm">
    Ce cours vous est proposé par{' '}
    <span className="text-blue-600 underline">
      {courseData.educator?.name || 'Yaps'}
    </span>
  </p>

  {/* Programme du cours */}
  <div>
    <h2 className="text-xl font-semibold mb-4">Programme du cours</h2>
    <div className="space-y-3">
      {courseData.courseContent.map((chapter, index) => (
        <div key={index} className="border border-gray-300 bg-white rounded">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
            onClick={() => toggleSection(index)}
          >
            <div className="flex items-center gap-2">
              <img
                className={`transform transition-transform ${
                  openSection[index] ? 'rotate-180' : ''
                }`}
                src={assets.down_arrow_icon}
                alt="arrow icon"
              />
              <p className="font-medium">{chapter.chapterTitle}</p>
            </div>
            <p className="text-sm text-gray-500">
              {(chapter.chapterContent?.length || 0)} leçons –{' '}
              {calculateChapterTime(chapter)}
            </p>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openSection[index] ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <ul className="list-disc px-6 py-2 text-sm text-gray-700">
              {chapter.chapterContent.map((lecture, i) => (
                <li key={i} className="flex items-start justify-between py-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        progresData &&
                        progresData.lectureCompleted.includes(lecture.lectureId)
                          ? assets.blue_tick_icon
                          : assets.play_icon
                      }
                      alt="icon"
                      className="w-4 h-4 mt-1"
                    />
                    <p>{lecture.lectureTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs">
                    {lecture.lectureUrl && (
                      <button
                        onClick={() =>
                          setPlayerData({
                            videoId: lecture.lectureUrl.split('/').pop(),
                            lectureId: lecture.lectureId,
                          })
                        }
                        className="hover:underline"
                      >
                        Regarder
                      </button>
                    )}
                    <p className="text-gray-500">
                      {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                        units: ['h', 'm'],
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Description complète */}
  <div>
    <h3 className="text-xl font-semibold mb-2">Description du cours</h3>
    <div
      className="text-sm leading-relaxed text-gray-700 rich-text"
      dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
    ></div>
  </div>
</div>

        {/* colonne de droite */}
        <div className='max-w-[424px] z-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
          {playerData?.lectureId && (
            <button
              onClick={() => markLectureAsCompleted(playerData.lectureId)}
              className='text-blue-600 px-4 pt-4'
            >
              {progresData?.lectureCompleted.includes(playerData.lectureId)
                ? 'Terminé'
                : 'Marquer comme terminé'}
            </button>
          )}

          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName='w-full aspect-video'
            />
          ) : (
            <img src={courseData.courseThumbnail} alt='' />
          )}

          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 px-4'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt='star icon' />
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt='clock icon' />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.lesson_icon} alt='lesson icon' />
              <p>{calculateNoOfLecture(courseData)} leçons</p>
            </div>
          </div>

          <div className='flex flex items-center gap-2 py-3 mt-10 px-4'>
            <h1 className='text-xl font-bold'>Noter ce cours :</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default Player
