import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import './ChallengeView.less';

//container to display challenge drafts
//will populate from data base, currently dummy values to test frontend functionality
const getDrafts = [{
  id: 1,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-1',
  description:'test object 1'
},
{
  id: 2,
  title:'Test-Draft-2',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 3,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-3',
  description:'test object 1'
},
{
  id: 4,
  title:'Test-Draft-4',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 5,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-5',
  description:'test object 1'
},
{
  id: 6,
  title:'Test-Draft-6',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 7,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-7',
  description:'test object 1'
},
{
  id: 8,
  title:'Test-Draft-8',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 9,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-9',
  description:'test object 1'
},
{
  id: 10,
  title:'Test-Draft-10',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 11,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-11',
  description:'test object 1'
},
{
  id: 12,
  title:'Test-Draft-12',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 13,
  title:'Test-Draft-13',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 14,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-14',
  description:'test object 1'
},
{
  id: 15,
  title:'Test-Draft-15',
  badge:'Badge-Image',
  description:'test object 2'
},
{
  id: 16,
  badge:'Badge-Image', //should be default if not yet selected in draft
  title:'Test-Draft-16',
  description:'test object 1'
},
{
  id: 17,
  title:'Test-Draft-17',
  badge:'Badge-Image',
  description:'test object 2'
}
];

//container to display assigned challenge
//will populate from data base, currently dummy values to test frontend functionality
const getAssigned = [{
  id: 1,
  badge:'Badge-Image',
  title:'Test-Assigned-1',
  description:'test object 1'
},
{
  id: 2,
  badge:'Badge-Image',
  title:'Test-Assigned-2',
  description:'test object 2'
}];

function handleChangeEdit(id) { 
  //handle change for drafts
  //should direct user to create challenge page with previously filled out fields - editable
  //handle navigation
  alert("You clicked on the pencil icon");

}
function handleChangeView(id) { 
  //handle change for past assignments
  //should direct user to create challenge page with previously filled out fields - not editable
  //handle navigation
  alert("You clicked on the view icon");

}
function handleChangeNew(){
  //handle navigation to create new challenge -> when merged
  alert("You clicked on the create new challenge button");
}
//container for teacher profile, no functionality currently - placeholder div
export default function ChallengeView(props) {
 
  const drafts = getDrafts.map(element=>{
    //displays each draft in table
    return (
      <tr key={element.id} >
        <td style={{textAlign:'left'}} >{element.badge}</td>
        <td>{element.title}</td>
        <td style={{textAlign:'right'}} onClick={(e) => {handleChangeEdit(element.id)}} id='icon'><i className='fa fa-pen' /></td>
      </tr>
    )
  })
  const assigned = getAssigned.map(element=>{
    //displays each assigned in table
    return (
      <tr key={element.id} >
        <td style={{textAlign:'left'}} >{element.badge}</td>
        <td>{element.title}</td>
        <td style={{textAlign:'right'}} onClick={(e) => {handleChangeView(element.id)}} id='icon'><i className='fa fa-eye' /></td>
      </tr>
    )
  })

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id='main-header'>Challenge View</div> 
      <button id='button' onClick={(e)=>{handleChangeNew()}}>Create New Challenge</button>
      <div id='challenge-view-container'>
        <div id='drafts'>
          <div id='challenge-header'>Drafts</div>
          <div id='challenge-wrapper'>
            <table className="challenge-table">
              <tbody>
                {drafts}
              </tbody>
            </table>
          </div>
        </div>
        <div id='past-assigned'>
          <div id='challenge-header'>Assigned</div>
          <div id='challenge-wrapper'>
            <table className="challenge-table">
              <tbody>{assigned}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}