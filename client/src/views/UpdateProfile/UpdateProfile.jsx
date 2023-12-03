import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMentor, updateTeacherProfilePicture, getCurrentStudent, getStudent, updateStudentProfilePicture} from '../../Utils/requests';


//updates the profile picture
async function queryDB(picture, isTeacher){
  console.log(isTeacher);
  if(isTeacher == 1){
    let teacher_profile = await getMentor();
    const response = await updateTeacherProfilePicture(teacher_profile.data.id, picture);
    if (response.err) {
      console.log("Failed to update profile pircture, error: " + response.err)
    } else {
      console.log('Update success');
    }
  }else if(isTeacher ==0){
    const currentStudent = await getCurrentStudent();
    let k = await getStudent(currentStudent.data.students[0].id)
    console.log(k);

  const response = await updateStudentProfilePicture(currentStudent.data.students[0].id, picture);
  if (response.err) {
    console.log("Response failed with " + response.err)
  } else {
    console.log('Updated Profile Successfully');
  }
  }
  
}

const UpdateProfile = ({isTeacher}) => {
        UpdateProfile.propTypes = {
            isTeacher: PropTypes.number.isRequired
        }

        useEffect(() => {
            const fileInput = document.getElementById('imageInput');
            if (fileInput) {
              fileInput.addEventListener('change', (event) => {
                if (event?.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    queryDB(e.target.result, isTeacher);
                  };
                  reader.readAsDataURL(event.target.files[0]);
                }
              });
            }
          }, []);  

  return (null);
};

export default UpdateProfile;

