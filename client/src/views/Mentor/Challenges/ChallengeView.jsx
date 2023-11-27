import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import './ChallengeView.less';
import { useNavigate } from 'react-router-dom';
import { getChallenges, getClassrooms, getMentor } from '../../../Utils/requests';
import Badge0 from "../../../Images/Badge0.jpg";
import Badge1 from "../../../Images/Badge1.jpg";
import LessonEditor from "../../ContentCreator/LessonEditor/LessonEditor";



//container for teacher profile, no functionality currently - placeholder div
export default function ChallengeView({updateChallenge}) {
  const navigate = useNavigate();
  const [getDrafts, setDrafts] = useState([]);
  const [getAssigned, setAssigned] = useState([]);
  var assigned = getAssigned;
  var drafts = getDrafts;

  function match(length){ 
    //if there are classrooms assigned => assigned else drafts
    if(length === 0){
      return true;
    }
    return false;
  }

  useEffect(() => { //get challenge data from database
    let challengeIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.challenges.forEach((challenge) => {
          challengeIds.push(challenge.id);
        });
        getChallenges(challengeIds).then((challenges) => {
          var draftData = challenges.filter(challenge => match(challenge.classrooms.length));
          var assignedData = challenges.filter(challenge => !match(challenge.classrooms.length));
          setDrafts(draftData);
          setAssigned(assignedData);
          console.log(challenges);
          
        });
      } else {
        message.error(res.err);
      }
    });
  }, []);

  function handleBadges(id){
    if(id == "Badge0" || id == "id_0" || id == 0){
      return Badge0;
    }
    else if(id == "Badge1" || id == "id_1" || id == 1){
      return Badge1;
    }
    else{
      console.log("unexpected badge id");
    }
  }

  function handleChangeEdit(challenge) { 
    //handle change for drafts
    //should direct user to create challenge page with previously filled out fields - editable
    //handle navigation
    updateChallenge(challenge);
    
    navigate('/challenge-creation');
  
  }
  function handleChangeView(challenge) { 
    //handle change for past assignments
    //should direct user to create challenge page with previously filled out fields - not editable
    //handle navigation
    updateChallenge(challenge);
    navigate("/awardbadges");
  }
  function handleChangeNew(){
    //handle navigation to create new challenge -> when merged
    navigate('/challenge-creation');
  }

  function handleEntries(drafts){
    //if no data yet -> display inbox icon
    if(drafts){
      if(getDrafts.length == 0){
        //return no data icon if no data
        return (
          <div id='empty'>
            <i className='fa fa-inbox fa-7x'/>
            <header>No Challenges Saved Yet</header>
          </div>
        );
      }
      else{
        drafts = getDrafts.map(element=>{
          //displays each draft in table
          return (
            <tr key={element.id} >
              <td style={{textAlign:'left'}} ><img id='badge' src={handleBadges(element.badge_id)} /></td>
              <td>{element.name}</td>
              <td style={{textAlign:'right'}} onClick={(e) => {handleChangeEdit(element)}} id='icon'><i className='fa fa-pen' /></td>
            </tr>
          )
        })
        return(
          <div id='challenge-wrapper'>
            <table className="challenge-table">
              <tbody>
                {drafts}
              </tbody>
            </table>
          </div>
        );
      }
    }
    else {
      if(getAssigned.length == 0){
        //return no data icon if no data
        return (
          <div id='empty'>
            <i className='fa fa-inbox fa-7x'/>
            <header>No Challenges Assigned Yet</header>
          </div>
        );
      }
      else{
        console.log(getAssigned);
        assigned = getAssigned.map(element=>{
          //displays each assigned in table
          return (
            <tr key={element.id} >
              <td style={{textAlign:'left'}} ><img src={handleBadges(element.badge_id)} id='badge'/></td>
              <td>{element.name}</td>
              <td style={{textAlign:'right'}} onClick={(e) => {handleChangeView(element)}} id='icon'><i className='fa fa-eye' /></td>
            </tr>
          )
        })
        return (
          <div id='challenge-wrapper'>
            <table className="challenge-table">
              <tbody>
                {assigned}
              </tbody>
            </table>
          </div>
        );
      }
    }
  }
 
  

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id='main-header'>Challenge View</div> 
      <button id='button' onClick={(e)=>{handleChangeNew()}}>Create New Challenge</button>
      <div id='challenge-view-container'>
        <div id='drafts'>
          <div id='challenge-header'>Drafts</div>
          {handleEntries(true)}
        </div>
        <div id='past-assigned'>
          <div id='challenge-header'>Assigned</div>
          {handleEntries(false)}
        </div>
      </div>
    </div>
  )
}