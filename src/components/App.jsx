import { useState, useEffect } from 'react'
import '../assets/styles/resume.css'


function InputElement({labelName, type = "text", uid, rContainer, id}) {
  const [value, setValue] = useState("");
  const handleEvents = (event) => {
    setValue(event.target.value)
    const uValue = event.target.value
    UpdateObjectValue({id, rContainer, uid, uValue})
  }
  return(
    <div className='label-container'>
      <label htmlFor={uid}>{labelName}</label>
      <input 
        type={type} 
        className='input-fields' 
        id = {uid}
        value={value}
        onChange={handleEvents}
        autoComplete="off"
      />
    </div>
  )
}

function UpdateObjectValue({id, rContainer, uid, uValue}){
  // console.log(uValue)
  rContainer((prevContent) => {
    const newMap = new Map(prevContent)
    const input = newMap.get(id)
    Object.values(input).forEach(entry => {
      if (entry[0] === uid){
        entry[1] = uValue
      }
    })
    return newMap
  })
}

function GeneralInformation({rContainer, id}){
  return(
    <section className='general-information'>
      <InputElement labelName="First Name" uid = {`fName${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Last Name" uid = {`lName${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Email" uid = {`email${id}`} type='email' rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Phone Number" type='number' uid = {`phoneNumber${id}`} rContainer = {rContainer} id = {id}/>
    </section>
  )
}

function EducationInformation({id, rContainer}) {
  return (
    <section className='education-information'>
      <InputElement labelName="Name of Education Institution" uid={`name${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Title of Study (Major)" uid={`info${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Date of Education Entrance" uid={`de${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Date of Education Leave" uid={`dl${id}`} rContainer = {rContainer} id = {id}/>
      <Button 
        content='Remove Education'
        handleClick={() => RemoveResumeContainer({id, rContainer})}
      />
    </section>
  )
}

function WorkInformation({ id, rContainer }) {
  return (
    <section className="work-information">
      <InputElement labelName="Name of Work Place" uid={`name${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Description" uid={`info${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Date of Work Entrance" uid={`de${id}`} rContainer = {rContainer} id = {id}/>
      <InputElement labelName="Date of Work Leave" uid={`dl${id}`} rContainer = {rContainer} id = {id}/>
      <Button
        content='Remove Work Experience'
        handleClick={() => RemoveResumeContainer({id, rContainer})}
      />
    </section>
  )
}

function RemoveResumeContainer({id, rContainer}){
  rContainer((prevContent) => {
    const newMap = new Map(prevContent)
    newMap.delete(id);
    return newMap
  })
}

function Button({className = "", content = "Click Me", handleClick}){
  const onClickHandler = (event) => {
    event.preventDefault();
    handleClick(event);
  };
  return(
    <button 
      className={className} 
      onClick={onClickHandler}
    >
      {content}
    </button>
  )
}

function AddResumeContainer({setEducationContainer = null, setWorkContainer = null, setGeneralContainer = null}){
  if(setEducationContainer){  
    ContainerHandler(setEducationContainer, false)
  }
  if (setWorkContainer){
    ContainerHandler(setWorkContainer, false)
  }
  if (setGeneralContainer){
    ContainerHandler(setGeneralContainer, true)
  }
}

function ContainerHandler(container, flag = false){
  container((prevContent) => {
    const randomID = crypto.randomUUID();
    const newMap = new Map(prevContent)
    if (!flag){
      newMap.set(randomID, {valOne: [`name${randomID}`, ''], valTwo: [`info${randomID}`, ''], valThree: [`de${randomID}`, ''], valFour: [`dl${randomID}`, '']})
    }

    if (flag){
      newMap.set(randomID, {firstName: [`fName${randomID}`, ''], lastName: [`lName${randomID}`, ''], email: [`email${randomID}`, ''], number: [`phoneNumber${randomID}`, '']})
    }
    return newMap
  })
}

function GeneralContainer({className = "", fName = "empty", lName = "empty", email = "empty", phoneNumber = "empty"}){
  //  console.log('fname')
  // console.log(lName)
  // console.log(email)
  return(
    <section className={className}>
      <h1 className='resume-name'>{fName} {lName}</h1>
      <aside className='resume-info'>
        <ul>
           <li>
              Phone Number: {phoneNumber}
            </li> 
            <li>
              Email: {email}
            </li>
        </ul>
      </aside>
    </section>
  )
}

function EducationContainer({className = "", institutionName = "", major = "", dateEnter = "", dateLeave = ""}){
  return(
    <section className={className}>
      <div className='institution-name'>
        <h2>{institutionName}:</h2>
      </div> 
      <div className='dateInfo'>
        <h2>{dateEnter} to {dateLeave}</h2>
      </div> 
      <h2>Title of Study: {major}</h2>
    </section>
  )
}

function WorkContainer({className = "", institutionName = "", description = "", dateEnter = "", dateLeave = ""}){
  return(
    <section className={className}>
      <div><h2>{institutionName}:</h2></div> <div className='dateInfo'><h2>{dateEnter} to {dateLeave}</h2></div> 
      <h2>Description: {description}</h2>
    </section>
  )
}



function App() {
  const [educationContainer, setEducationContainer] = useState(new Map())
  const [workContainer, setWorkContainer] = useState(new Map())
  const [generalContainer, setGeneralContainer] = useState(new Map())
  const [buttonHidden, setButtonHidden] = useState(true)
  const [formHidden, setFormHidden] = useState(true)

  const handleGeneralHandler = () => {
    AddResumeContainer({setGeneralContainer});
    setButtonHidden(prevState => !prevState);
  }

  const handleFormHandler = () => {
    setFormHidden(prevState => !prevState)

  }

  const submitHandler = () => {
    handleFormHandler()
  }

  // useEffect(() => {
  //   console.log("Updated resume:", [...workContainer]);
  // }, [workContainer]);
  // useEffect(() => {
  //   console.log("Updated educa:", [...educationContainer]);
  // }, [educationContainer]);
  // useEffect(() => {
  //   console.log("Updated gen:", generalContainer.size);
  // }, [generalContainer]);
  return (
    <>
      <form action="">
        <main className='information-form'>
            {[...generalContainer].map(([generalID]) => {
              return <GeneralInformation key={generalID} id={generalID} rContainer={setGeneralContainer}/>
            })}
            {buttonHidden && ( 
                <Button 
                  className=''
                  content='Name +'
                  handleClick={handleGeneralHandler}
                />
            )}
            {[...educationContainer].map(([educationID]) => {
                return <EducationInformation key={educationID} id={educationID} rContainer = {setEducationContainer}/>
            })}
            <Button 
              className=''
              content='Education +'
              handleClick={() => AddResumeContainer({setEducationContainer})}
            />
            {[...workContainer].map(([workID]) => {
                return <WorkInformation key={workID} id={workID} rContainer={setWorkContainer}/>
            })}
            <Button
              content='Work +'
              handleClick={() => AddResumeContainer({setWorkContainer})}
            />
          </main>
          {/* <Button 
            content='submit'
            handleClick={submitHandler}
        /> */}
      </form>



      <>
      <main className='resume-container'>
        {generalContainer.size >= 1 && (
            [...generalContainer].map(([generalID, value]) => {
              return <GeneralContainer 
                        key={generalID} 
                        className='general-container' 
                        fName={value.firstName[1].charAt(0).toUpperCase() + value.firstName[1].slice(1)} 
                        lName={value.lastName[1].charAt(0).toUpperCase() + value.lastName[1].slice(1)} 
                        email={value.email[1]} 
                        phoneNumber={value.number[1]}
                      />
            })
        )}
        {generalContainer.size === 0 && (
          <GeneralContainer/>
        )}
        <h1 className='section-headers'>Education</h1>
        {educationContainer.size >= 1 && (
          [...educationContainer].map(([educationID, value]) => {
            return(
              <EducationContainer
                key={educationID}
                className='education-container'
                institutionName= {value.valOne[1]}
                major={value.valTwo[1]}
                dateEnter={value.valThree[1]}
                dateLeave={value.valFour[1]}
              />
            )
          })
        )}
        <h1 className='section-headers'>Work Experience</h1>
        {workContainer.size >= 1 && (
          [...workContainer].map(([workID, value]) => {
            return(
              <WorkContainer
                key={workID}
                className='work-container'
                institutionName= {value.valOne[1]}
                description={value.valTwo[1]}
                dateEnter={value.valThree[1]}
                dateLeave={value.valFour[1]}
              />
            )
          })
        )}
      </main>
      {/* <Button 
        content='Edit'
        handleClick={submitHandler}
      /> */}
      </>
      

    </>
  )
}

//name email and phone number
// educational experience:
//school name, title of study (major), and dates
//Experience
export default App
