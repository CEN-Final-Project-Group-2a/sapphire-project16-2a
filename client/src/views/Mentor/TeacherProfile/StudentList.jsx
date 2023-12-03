import React, { useEffect, useState } from "react";
import './TeacherProfile.less';
import { getChallenges, getClassrooms, getMentor } from '../../../Utils/requests';
import { Menu, Dropdown } from 'antd';
import Badge0 from "../../../Images/Badge0.jpg";
import Badge1 from "../../../Images/Badge1.jpg";
import { DownOutlined } from '@ant-design/icons';

//container for teacher profile details, no functionality currently - placeholder div
export default function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [filterName, setFilterName] = useState("All Classrooms");
  const [filter, setFilter] = useState(0); //0 = all classrooms
  const [challenges, setChallenges] = useState([]);

  useEffect(() => { //get challenge data from database
    let classIds = [];
    let challengeIds = [];
    getMentor().then((res) => {
      if (res.data) {
        //get classrooms for all students
        res.data.classrooms.forEach((classroom) => {
          classIds.push(classroom.id);
        });
        getClassrooms(classIds).then((classes) => {
          setClassrooms(classes);
          let st = [];
          classes.forEach((curr) => {
            curr.students.forEach((student)=> {st.push(student);})
          });
          setStudents(st);
        });
        //get challenge data to get students with badges
        res.data.challenges.forEach((challenge) => {
          challengeIds.push(challenge.id);
        });
        getChallenges(challengeIds).then((challenges) => {
          setChallenges(challenges.filter(challenge => challenge.classrooms.length != 0));
          console.log(challenges);
        });
      } else {
        message.error(res.err);
      }
    });
  }, []);

  
  
  function handleFilter(classId, className){
    setFilter(classId);
    setFilterName(className);
  }

  const menu = () => {
    let num = 1;
    return (
      <Menu id='menu'>
        { classrooms.map(classroom =>
            <Menu.Item key={num++} onClick={() => handleFilter(classroom.id, classroom.name)}>
              <i />
              &nbsp; {classroom.name}
            </Menu.Item>
        )}
        {(<Menu.Item key={0} onClick={() => handleFilter(0, "All Classrooms")}>
              <i />
              &nbsp; All Classrooms
            </Menu.Item>)}
      </Menu>
    )
  }

  function getBadge(id){
    if(id == "Badge0"){
      return Badge0;
    }
    else if(id == "Badge1"){
      return Badge1;
    }
    else{
      console.log("unexpected badge id");
    }
  }
  function handleBadges(student){
    let badges = [];
    challenges.forEach((challenge) => {
      if(challenge.students.length != 0){
        challenge.students.forEach((curr) => {
          if(curr.name == student.name){
            badges.push(challenge.badge_id);
          }
        })
      }
    })
    console.log(badges.length);
    
    
    if(badges.length != 0){
      return (
        badges.map(badge =>
          <><img src={getBadge(badge)} alt={badge} id='badge'/> {'  '}</>
        )
      );
    }
    else{
      //student doesn't have badges -> placeholder badge
      return(<i style={{color: 'lightgray'}} alt='placeholder badge' className='fa fa-medal fa-2x' />);
    }
    
  }
 
  

  function displayStudents() {
    return (students.filter((student) => filter == 0 || student.classroom == filter).map(student=>{
      //displays each student in table
      //replace icon with profile picture later
      //<i className='fa fa-user-circle fa-2x'/>
      return (
        <tr key={student.id} >
          <td style={{textAlign:'left'}} id='profile'>
            
            <div>{student.name}</div>
          </td> 
          <td></td>
          <td style={{textAlign:'right'}} id='badges'>{handleBadges(student)}</td>
        </tr>
      )
    }));
  }

  return (
    <div id='student-wrapper'>
      <div id='student-header'>
        <div id='header-text' style={{marginLeft:'1vw'}}>My Students</div>
        <div id='dropdown-wrapper'><Dropdown overlay={menu()} trigger={['click']}>
          <button
            //className='ant-dropdown-link'
            id='filter-students'
            onClick={(e) => e.preventDefault()}
          >
           {filterName} <DownOutlined />
          </button></Dropdown></div>
      </div>
      <div id='student-list'>
        <table className="student-table">
          <tbody>
            {displayStudents()}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}