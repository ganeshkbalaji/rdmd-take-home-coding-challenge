import React, { Fragment } from 'react'

// Landing page for the site
export default function Home() {
  return (
    <Fragment>
      <p>Welcome to Patient Manager, an app to view and edit patient records.</p>
      <p>Use the navigation at the top to view the Patient list. Here you can add patients by providing their name, date of birth, diagnosis, and email address.</p>
    </Fragment>
  )
}
