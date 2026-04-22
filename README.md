*Author and Developer: [Kylee Brown](https://www.linkedin.com/in/kylee-brown-7167b9274/)*

# KB's Kustomz Website (Remodel)

### Modern fullstack website + CMS built for an auto body shop to manage content without developer involvement

### [Live Site](#)  
### [Old Version Repo](https://github.com/TechFataleFreelance/KB-s-Kustomz)

# Description
KBs Kustomz is a website & content management system built to advertise auto body and painting services for KB's Kustomz located in Wyanet, IL. The website features a gallery, about us page, services page, and a contact us page as well as a cms dashboard to eliminate manual content updates and allow the client to manage their own site.


### Before & After Photos

<img src="https://github.com/user-attachments/assets/4ca8b650-e1fd-4924-9145-bd7003d2be92" width="100%">
<img src="https://github.com/user-attachments/assets/df4f6529-8e27-440e-822f-af1790984361" width="100%">
<img src="https://github.com/user-attachments/assets/83070187-96a2-407b-880f-47c1a72269e9" width="100%">

# Fearures
- Client-managed CMS dashboard (upload/delete images)
- Role-based authentication (Admin vs General users)
- Image storage with Vercel Blob
- SEO-optimized multi-page structure
- Fully responsive mobile UI

______
# Tech Stack
- `Next.js` (App router)
  - Framework used for creating the fullstack website
- `Next.js Blobs` (Storage)
  - Storage offered by vercel used to store the images my client updates (I hope to upgrade to cloudinary if more storage is needed)
- `Supabase Database + OAuth`
  - Database used to authenticate and hold user information and roles as well as image metadata + URLs
  - Integrated Google Auth for quicker sign in
- `Tailwind CSS` + `ShadCN` User Interface Library
  - Used for quick & uniform styling and component building
______

### CMS Dashboard
<table>
  <tr>
    <th>Page</th>
    <th>View</th>
  </tr>

  <tr>
    <td>Dashboard Home</td>
    <td><img src="https://github.com/user-attachments/assets/923a46c9-bfad-4ca2-a678-32c7042c9be7" width="100%"></td>
  </tr>

  <tr>
    <td>Login Page</td>
    <td><img src="https://github.com/user-attachments/assets/b7edb0d3-6a35-4bf3-8627-25a6a68acd69" width="100%"></td>
  </tr>
  <tr>
    <td>Log Out State</td>
    <td><img width="1440" height="777" alt="Logout Modal Popup" src="https://github.com/user-attachments/assets/3e713c93-dd2b-4ec5-9746-dd0f1deca346" /></td>
  </tr>
  </table>

  ### Image Management

<table>
  <tr>
    <th>Page</th>
    <th>View</th>
  </tr>

  <tr>
    <td>Upload Images</td>
    <td><img src="https://github.com/user-attachments/assets/d32140c8-1a4d-48fa-b5ea-f1bc015fa8ec" width="100%"></td>
  </tr>

  <tr>
    <td>Manage Images</td>
    <td><img src="https://github.com/user-attachments/assets/928f7dfc-ade8-47c0-b76c-18ee560df8ba" width="100%"></td>
  </tr>
</table>

### User Management

<table>
  <tr>
    <th>Feature</th>
    <th>View</th>
  </tr>

  <tr>
    <td>Create User</td>
    <td><img src="https://github.com/user-attachments/assets/bbf1b79b-80c8-46d7-b6dd-49db412a4b1f" width="100%"></td>
  </tr>

  <tr>
    <td>Manage Users</td>
    <td><img src="https://github.com/user-attachments/assets/9503fb41-b8a8-49ba-8e97-cc028b19fdcd" width="100%"></td>
  </tr>

  <tr>
    <td>Edit User State</td>
    <td><img src="https://github.com/user-attachments/assets/b09e06e2-b09b-4c8f-bdf9-b95b492341f8" width="100%"></td>
  </tr>
</table>

# Key Improvements
- **Created a dashboard CMS** 'backend' that the client can use to manage the images anytime and anywhere wifi is availablee. Using `NEXT` server side capabailities, I created api routes that handled uploads to `NEXT` Blob storage and `Supabase`
  - Solved the proplem of manually adding the images to the site files]
  - converted the `SPA` (Single Page Application) to a `fullstack` web app
- **leveraged cachng & revalidating** to lighten the request load on the server and database API. added `fetchpriority` attributes to the appropriate HTML elements
  - Improved desktop and mobile site speed, first contentful paint (FCP) and largest contentful paint times
- **Used media queries** to make the mobile UI clean, easy to navigate, and aesthetic
  - Solved the problem of the mobile site not formatting properly and made the mobile experience seanless
- **implemented NEXT SEO capabilities** by making sure each public-facing page had SEO meta data (description, title), I made sure every image on the site had an ALT tag, added a `schemaMarkup` document for crawlers, and added an LLM doc as well for AI models. On private pages, I made sure search engines should not crawl the pages setting the metadata to `robots: {index: false, follow: false}`
  - solved the challenge of making sure the site had the sufficient SEO so the site could appear higher up on search engines like Google when crawled 


# Security Improvements
- Enabled row level security (`RLS`) and created policies that dictate who is allowed to alter tables in `supabase`
- Used Server side to securely cookies to set and store user session tokens as opposed to being exposed on the clinet side
- whitelisted content sent from client as a request in the middleware to combat against injection attacks
- ran vulnerablility scans periodically and updated to the most recently patched version of the compromised/depricated library
- Enforced access control by setting up role based access (RBA) to the database (`GENERAL` vs `ADMIN`) and using the **rule of least privleged**  
