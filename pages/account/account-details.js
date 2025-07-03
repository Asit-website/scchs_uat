import React, { useEffect, useState } from 'react'
import RequireAuthentication from '../../utils/requireAuthentication'
import Head from 'next/head'
import style from "./../css/account.module.scss";
import Link from 'next/link';
import $ from 'jquery';
import NumberOnly from '../../utils/common/number-only';
import Navigation from './navigation';
import GlobalHeaderFooter from '../../utils/common/global-header-footer';


export default function AccountDetails(props) {
  const [pageLoad, setPageLoad] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [message, setMessage] = useState('');

  const [profileImageShow, setProfileImageShow] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageFile, setProfileImageFile] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const userData = props?.page_content?.user;
  NumberOnly()

  const getuserData = async () => {
    setPageLoad(true)
    try {
      const getUserData = await fetch(`${process.env.server.api}user-profile`, { method: "GET",headers: { 'Authorization': 'Bearer '+userData.access_token, 'Accept': 'application/json', 'Content-Type': 'application/json'}});
      const getUserRes = await getUserData.json();
        if(getUserRes.status == true){
          const obj = getUserRes.data;
          setFirstName(obj.name)
          setLastName(obj.last_name)
          setEmailAddress(obj.email)
          
          if(typeof obj.avatar != null){
            setProfileImageShow(obj.avatar)
          }
          if(typeof obj.company != null){
            setCompany(obj.company)
          }
          if(typeof obj.mobile_number != null){
            setPhoneNumber(obj.mobile_number)
          }
          setPageLoad(false)
        }else{
          window.location.href = "/logout";
        }
      
    } catch (error) {
      setMessage("Something went wrong.")
      setPageLoad(false)
    }

    
  }

  useEffect(()=>{
      const files = $("#profileImage");
      function getFileData(){
          var input = document.getElementById('profileImage');
          var children = "";
          
          setProfileImageFile($('#profileImage')[0].files[0]);
          console.log( $('#profileImage')[0].files[0])

          for (var i = 0; i < input.files.length; ++i) {
            console.log('input.files')
            
              children += '<img src="'+window.URL.createObjectURL(input.files[i])+'" alt="'+input.files.item(i).name+'" title="'+input.files.item(i).name+'" />';
          }
          $(".uploadedImg").html(children);
      }
      files.change(function(){
          const maxAllowedSize = 10 * 1024 * 1024;
          const fileValue = $(this).val();
          if(fileValue != ""){
              const idxDot = fileValue.lastIndexOf(".") + 1;
              const extFile = fileValue.substr(idxDot, fileValue.length).toLowerCase();
              if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
                  const imageSize = $(this).prop('files')[0]?.size ;
                  const fileName = $(this).prop('files')[0]?.name;
                  if(imageSize <= maxAllowedSize) {
                      getFileData();
                  }else{
                      fileList.html('');
                      files.val('')
                      alert("Too big of a file. Uploads must be under 3 MB in size.")
                      return false;
                  }
              }else{
                  fileList.html('');
                  files.val('')
                  alert("Only images & documents files are allowed!")
                  return false;
              }
          }else{
              fileList.html('');
              files.val('')
          }
      })
      getuserData();
  },[])

  const updateData = async () => {
    setPageLoad(true)
    const formData = {
      name:firstName,
      last_name:lastName,
      email:emailAddress,
      company:company,
      phone_number:phoneNumber,
      password:password,
      password_confirmation:confirmPassword,
      current_password:currentPassword
    }
    const updateFormData = await fetch(`${process.env.server.api}profile-update`, { method: "POST",body: JSON.stringify(formData), headers: { 'Authorization': 'Bearer '+userData.access_token, 'Accept': 'application/json', 'Content-Type': 'application/json'}});
      const updateRes = await updateFormData.json();
      console.log('updateRes')
      console.log(updateRes)
      if(updateRes.status == true){
        setMessage(updateRes.message);
      }else{
        setMessage(updateRes.message);
      }
      setPageLoad(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(firstName == ""){
      setMessage("First Name field cannot be blank.")
      setFormSubmit(false);
    }
    else if(lastName == ""){
      setMessage("Last Name field cannot be blank.")
      setFormSubmit(false);
    }
    else if(emailAddress == ""){
      setMessage("You must enter a valid email.")
      setFormSubmit(false);
    }
    else if(password != "" && password.length < 8){
        setMessage("The password must be at least 8 characters.")
        setFormSubmit(false);
        return false;
    }
    else if(password != "" && password.search(/[a-z]/i) < 0){
        setMessage("Your password must contain at least one letter.")
        setFormSubmit(false);
        return false;
    }
    else if(password != "" && password.search(/[0-9]/) < 0){
        setMessage("Your password must contain at least one letter.")
        setFormSubmit(false);
        return false;
    }
    else if(password != confirmPassword){
      setMessage("Password and confirm password does not match.")
      setFormSubmit(false);
    }
    else if(password != "" && confirmPassword != "" && currentPassword == ""){
      setMessage("Please enter the current password.")
      setFormSubmit(false);
    }else{
      setMessage("")
      setFormSubmit(true);
      updateData();
    }
    
  }

  return (
    <div className={style.pageAccountBG}>
      <div className={style.pageAccount}>
      
        <Head>
          <title>Account Details</title>
          <meta name="description" content="We're the 92d Force Support Squadron, at Fairchild Air Force Base, delivering exceptional experiences to REFUEL Airmen, their families and the Fairchild community. Join the FUN!"
          ></meta>
        </Head>

        { pageLoad == true ? (<span className='loadingOverlay' style={{display:'block', position:'fixed'}} />) : "" }

        <div className="container">
          <h1 className={style.pageHead}>Account settings</h1>

          <Navigation isActive="3" />

          <div className={style.accountContainer}>
            <div className={style.formBuilder}>


                <form method='POST' onSubmit={handleSubmit} encType="multipart/form-data">

                  <div className={style.profilePhoto} style={{display:'none'}}>
                    <label htmlFor="profileImage">
                      <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4987 8C17.9654 8 19.1654 9.2 19.1654 10.6667C19.1654 12.1333 17.9654 13.3333 16.4987 13.3333C15.032 13.3333 13.832 12.1333 13.832 10.6667C13.832 9.2 15.032 8 16.4987 8ZM16.4987 21.3333C20.0987 21.3333 24.232 23.0533 24.4987 24H8.4987C8.80536 23.04 12.912 21.3333 16.4987 21.3333ZM16.4987 5.33333C13.552 5.33333 11.1654 7.72 11.1654 10.6667C11.1654 13.6133 13.552 16 16.4987 16C19.4454 16 21.832 13.6133 21.832 10.6667C21.832 7.72 19.4454 5.33333 16.4987 5.33333ZM16.4987 18.6667C12.9387 18.6667 5.83203 20.4533 5.83203 24V26.6667H27.1654V24C27.1654 20.4533 20.0587 18.6667 16.4987 18.6667Z" fill="#3595F6"/>
                      </svg>
                      <h4>Add A Profile Image</h4>
                      <span>Drag and drop or choose a file to upload</span>
                      <input type="file" name="profileImage" id='profileImage' value={profileImage} accept="image/jpeg,image/gif,image/png" onChange={(e) => setProfileImage(e.target.value)} />
                      <div className={style.uploadedImg+ " uploadedImg"}>
                        {profileImageShow != "" ? (<img src={profileImageShow} alt='Img' />):""}
                      </div>
                    </label>
                  </div>

                  {message != '' ? (<span className={style.formMessge}>{message}</span>):""}

                  <div className={style.formGroup}>

                      <div className={style.formControl}>
                        <label>First Name <small>*</small></label>
                        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={'30'}  /> 
                      </div>
                      
                      <div className={style.formControl}>
                        <label>Last Name <small>*</small></label>
                        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={'30'}  /> 
                      </div>
                      
                  </div>

                  <div className={style.formGroup}>

                      <div className={style.formControl}>
                        <label>Company <small>*</small></label>
                        <input type="text" name="company" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={'30'}  /> 
                      </div>
                      
                      <div className={style.formControl}>
                        <label>Phone Number</label>
                        <input type="text" maxLength={'13'} className='numberOnly' name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /> 
                      </div>
                      
                  </div>
                  
                  <div className={style.formGroup}>

                      <div className={style.formControl}>
                        <label>Email Address <small>*</small></label>
                        <input type="text" name="emailAddress" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} maxLength={'50'}  /> 
                      </div>
                      
                      <div className={style.formControl}>
                        <label>Password</label>
                        <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={'20'} /> 
                      </div>
                      
                  </div>

                  <div className={style.formGroup}>

                      <div className={style.formControl}>
                        <label>Confirm Password</label>
                        <input type="text" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} maxLength={'20'}  /> 
                      </div>
                      
                      <div className={style.formControl}>
                        <label>Current Password</label>
                        <input type="text" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} maxLength={'20'} /> 
                      </div>
                      
                  </div>


                  <div className={style.formAction}>
                      <button type="submit" className={style.buttonSubmit}>Update Details</button>
                  </div>

                </form>
                
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return RequireAuthentication(context, async (session) => {
    const globalSettings = await GlobalHeaderFooter();
    return {
      props: {
        page_content: {user:session.user},
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      }
    };
  });
}
