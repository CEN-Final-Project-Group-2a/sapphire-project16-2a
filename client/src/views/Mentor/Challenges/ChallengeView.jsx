import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import './ChallengeView.less';
import { useNavigate } from 'react-router-dom';
import { getChallenges, getMentor, getStudentClassroom, getClassrooms, getClassroom, createChallenge} from '../../../Utils/requests';
import Badge0 from "../../../Images/Badge0.jpg";
import Badge1 from "../../../Images/Badge1.jpg";

//container for teacher profile, no functionality currently - placeholder div
export default function ChallengeView({setChallenge}) {
  const navigate = useNavigate();
  const [getDrafts, setDrafts] = useState([]);
  const [getAssigned, setAssigned] = useState([]);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [classrooms, setClassrooms] = useState({});
  const [mentorId, setMentorId] = useState();
  const [clickedDraft, setClickedDraft] = useState(null);

  var assigned = getAssigned;
  var drafts = getDrafts;

  function match(length){ 
    //if there are classrooms assigned => assigned else drafts
    if(length === 0){
      return true;
    }
    return false;
  }

  useEffect(() => {
    const selectedNames = selectedChallenges.map(challenge => challenge.name);
    console.log("Selected Challenge Names:", selectedNames);
  }, [selectedChallenges]);

  useEffect(() => {
    getMentor().then((res) => {
      if (res.data) {
        setMentorId(res.data.id);
      } else {
        message.error(res.err);
        navigate('/teacherlogin');
      }
    })
  }, []);


  useEffect(() => {
    // Retrieve data
    
    const storedAssignedChallenges = localStorage.getItem('assignedChallenges');
    if (storedAssignedChallenges) {
      setAssigned(JSON.parse(storedAssignedChallenges));
    } else {
      setAssigned([]); // Set an empty array as the initial state if no data is found in localStorage
    }


  }, []); 

  useEffect(() => { //get challenge data from database
    let challengeIds = [];
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.challenges.forEach((challenge) => {
          challengeIds.push(challenge.id);
        });
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });
        setMentorId(res.data.id);
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
        getChallenges(challengeIds).then((challenges) => {
          var draftData = challenges.filter(challenge => match(challenge.classrooms.length));
          var assignedData = challenges.filter(challenge => !match(challenge.classrooms.length));
          
          setDrafts([...draftData]);
         
         // setAssigned([...assignedData]); 
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
    console.log(challenge);
    setChallenge(challenge);
    navigate('/challenge-creation');
  
  }
  function handleChangeView(challenge) { 
    //handle change for past assignments
    //should direct user to create challenge page with previously filled out fields - not editable
    //handle navigation
    console.log(challenge);
    setChallenge(challenge);
    navigate("/awardbadges");
  }
  function handleChangeNew(){
    //handle navigation to create new challenge -> when merged
    navigate('/challenge-creation');
  }

  
  const handleClearAssigned = () => {

    setAssigned([]);
    localStorage.setItem('assignedChallenges', JSON.stringify([]));

  };

  
  //Onclick
  const handleAddToAssigned = async () =>{
    try {
      if (classrooms && classrooms.length > 0) {
        const selectedDrafts = selectedChallenges.map(challenge => challenge);
       
          
            //console.log(`Selected drafts assigned to ${classroom.name}`);
           

        setAssigned(prevAssigned => [...prevAssigned, ...selectedDrafts]);
        localStorage.setItem('assignedChallenges', JSON.stringify([...getAssigned, ...selectedDrafts]));
    
        
  
      } else {
        console.log('No classrooms found');
      }
    } catch (error) {
      console.error('Error adding drafts to assigned:', error);
      // Handle the error
    }

  }

  


  function handleClickDraft(element){

    const isAlreadySelected = selectedChallenges.some(challenge => challenge.id === element.id);
    
    if (isAlreadySelected) {
      const updatedChallenges = selectedChallenges.filter(challenge => challenge.id !== element.id);
      setSelectedChallenges(updatedChallenges);
    } else {
      const updatedChallenges = [...selectedChallenges, element];
      setSelectedChallenges(updatedChallenges);
    }
    const updatedDrafts = getDrafts.map(draft =>{
      if (draft.id === element.id) {
        return {
          ...draft,
          selected: !draft.selected,
          clicked: true,
        };
      }
      return draft;
    });
    
    setDrafts(updatedDrafts);

    setTimeout(() => {
      const resetClickedDrafts = updatedDrafts.map(draft => ({
        ...draft,
        clicked: false,
      }));
      setDrafts(resetClickedDrafts); // Reset clicked status after a delay
    }, 200);
  
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
              <tr key={element.id} onClick={() => handleClickDraft(element)} className={`${element.selected ? 'selected' : ''} ${element.clicked ? 'clicked' : ''}`}>
              
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
          <button id='add-to-assigned-btn' onClick={handleAddToAssigned}>Add Selected Drafts to Assigned</button>
          <button id='remove-from-assigned' onClick={handleClearAssigned}>Unassign Draft</button>
        </div>
      </div>
    )

      


  }