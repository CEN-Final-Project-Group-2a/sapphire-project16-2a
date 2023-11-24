import React, { useEffect, useState, useRef } from "react";
import './TeacherProfile.less';
import { getStudents, getClassrooms, getMentor } from '../../../Utils/requests';
import { Menu, Dropdown } from 'antd';

//container for teacher profile, no functionality currently - placeholder div
export default function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [filterName, setName] = useState("All Classrooms");
  const [filter, setFilter] = useState(0); //0 = all classrooms

  useEffect(() => { //get challenge data from database
    let classIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classIds.push(classroom.id);
        });
        getClassrooms(classIds).then((classes) => {
          setClassrooms(classes);
          let st = [];
          classrooms.forEach((curr) => {
            curr.students.forEach((student)=> {st.push(student);})
          });
          setStudents(st);
        });
      } else {
        message.error(res.err);
      }
    });
  }, [students]);

  var num = 1;
  
  
  function handleFilter(classId, className){
    setFilter(classId);
    setName(className);
  }

  const menu = (
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
  );
  
 
  function displayStudents(){
    
    return (students.filter((student) => filter == 0 || student.classroom == filter).map(student=>{
      //displays each student in table
      //replace icon with profile picture later
      return (
        <tr key={student.id} >
          <td style={{textAlign:'left'}} id='profile'>
            <i className='fa fa-user-circle fa-2x'/>
            <div>{student.name}</div>
          </td> 
          <td></td>
          <td style={{textAlign:'right'}} id='badges'>badges</td>
        </tr>
      )
    }));
  }


  return (
    <div id='student-wrapper'>
      <div id='student-header'>
        <div id='header-text'>My Students</div>
        <div id='dropdown-wrapper'><Dropdown overlay={menu} trigger={['click']}>
          <button
            className='ant-dropdown-link'
            id='filter-students'
            onClick={(e) => e.preventDefault()}
          >
           {filterName}
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