import React, { useEffect, useState, useRef, useContext } from 'react'
import uniqid from 'uniqid'; 
import Quill from 'quill';
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext)
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

   const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
   )
   // ouvrir la fenetre et configurer les chapitres
   const HandleChapter = (action, chapterId) => {
    if(action === 'add') {
      const title = prompt('Entrez votre nom de chapitre');
      if(title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder +
          1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
        chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed} : chapter)
      );
    }
   }

   //open the Pop up link in add Lecture
   const handleLecture = (action, chapterId, lectureIndex) => {
    if(action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
        setChapters(
          chapters.map((chapter) => {
            if (chapter.chapterId === chapterId) {
              chapter.chapterContent.splice(lectureIndex, 1);
            }
            return chapter;
          })
        );
      }
    };


    const addLecture = () => {
      setChapters(chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.
            chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
              lectureId: uniqid()
            
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      }));
      setShowPopup(false);
      setLectureDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false,

      });
    };


    const handleSubmit = async (e) => {

      try {
        e.preventDefault()
        if(!image){
          toast.error('Aucune image séléctionné')
        }

        const courseData = {
          courseTitle,
          courseDescription: quillRef.current.root.innerHTML,
          coursePrice: Number(coursePrice),
          discount: Number(discount),
          courseContent: chapters,
        }

        const formData = new FormData()
        formData.append('courseData', JSON.stringify(courseData))
        formData.append('image', image)

        const token = await getToken()
        const {data} = await axios.post(backendUrl + '/api/educator/add-course',
           formData, { headers: { Authorization: `Bearer ${token}`}})

           if(data.succes){
            toast.success(data.message)
            setCourseTitle('')
            setCoursePrice(0)
            setDiscount(0)
            setImage(null)
            setChapters([])
            quillRef.current.root.innerHTML = ""
            
           }else{
            toast.error(data.message)
           }
      } catch (error) {
        toast.error(error.message)
      }
      
    };
   

   // initiate Quill once
   useEffect(() => {
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
   }, [])



  return (
    <div className='h-screen overflow-scroll flex flex-col items-start
    justify-between md:p-8 md:pb-0 p-4 pt-8 pb-O'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>

          <p>Titre du cours</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text"
          placeholder='Ecrire ici' className='outline-none md:py-2.5
          py-2 px-3 rounded border border-gray-500' required />

        </div>

        <div className='flex flex-col gap-1'>

          <p>Description du cours</p>
          <div ref={editorRef}></div>

        </div>

        <div className='flex items-center justify-between flew-wrap'>

          <div className='flex flex-col gap-1'>
            <p>Prix du cours</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' 
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Télécharger l'image</p>

            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="upload icon"
              className='p-3 bg-blue-500 rounded' />

              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden/>
              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ''} alt="" />
              </label>


          </div>

        </div>

        <div className='flex flex-col gap-1'>
          <p>Remise %</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount} type="number"
          placeholder='0' min={0} max={100} 
          className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
        </div>

        {/* Add chapters*/}
        <div>
          {chapters.map((chapter, chapterIndex) =>(
            <div key={chapterIndex} 
            className='bg-white border rounded-lg mb-4'>

              <div className='flex justify-between items-center p-4 border-b'>

                <div className='flex items-center'>
                  <img onClick={() => HandleChapter('toggle', chapter.chapterId)}
                   src={assets.dropdown_icon} width={14} alt="dropdown icon" className={`mr-2 cursor-pointer transition-all
                    ${chapter.collapsed && "-rotate-90"}`} />
                  <span className='font-semibold'>
                  {chapterIndex + 1} {chapter.chapterTitle}
                  </span>

                </div>

                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img onClick={() => HandleChapter('remove', chapter.chapterId)} 
                 src={assets.cross_icon} alt="cross icon" className='cursor-pointer' />

              </div>

              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) =>(
                    <div key={lectureIndex} className='flex justify-between
                    items-center mb-2'>
                      <span>{lectureIndex+ 1}{lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank
                      ' className='text-blue-500'>Link</a>
                      -{lecture.isPreviewFree ? 'Prévisualiser gratuitement' : 'Payer'}</span>
                      <img src={assets.cross_icon} alt="cross icon" onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} 
                      className='cursor-pointer' />

                    </div>
                  ))}

                    <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={() => handleLecture('add',
                      chapter.chapterId)}>
                    + Ajouter une vidéo 
                    </div>

                </div>
              )}

            </div>
          ))}

          <div className='flex justify-center items-center bg-blue-100 p-2
          rounded-lg cursor-pointer' onClick={() => HandleChapter('add')}>+ Ajouter un chapitre</div>
          
          {/*Pop Up */}
          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center
            bg-gray-800 bg-opacity-50'>

              <div className='bg-white text-gray-700 p-4 rounded relative w-full
              max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Ajouter lecture</h2>

                <div className='mb-2'>
                  <p>Titre de lecture</p>
                  <input 
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails,
                    lectureTitle: e.target.value })} />
                </div>

                <div className='mb-2'>
                  <p>Durée (minutes)</p>
                  <input 
                  type="number"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails,
                    lectureDuration: e.target.value })} />
                </div>

                <div className='mb-2'>
                  <p>Lecture URL</p>
                  <input 
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails,
                    lectureUrl: e.target.value })} />
                </div>

                <div className='flex gap-2 my-4'>
                  <p>prévisualiser gratuitement</p>
                  <input type="checkbox" className='mt-1 scale-125'
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails,
                    isPreviewFree: e.target.checked })} />

                </div>

                <button type='button' className='w-full bg-blue-400 text-white px-4 py-2 rounded' onClick={addLecture}>
                  Ajouter</button>

                  <img onClick={() => setShowPopup(false)} src={assets.cross_icon} alt="cross icon"
                  className='absolute top-4 right-4 w-4 cursor-pointer' />
                

              </div>

            </div>
          )

          }

        </div>

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8
        rounded my-4'> Ajouter</button>

      </form>
      
    </div>
  )
}

export default AddCourse
