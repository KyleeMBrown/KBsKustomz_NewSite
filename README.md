*Author and Developer: [Kylee Brown](https://www.linkedin.com/in/kylee-brown-7167b9274/)*

# KB's Kustomz Website (Remodel)

### Modern full-stack website + CMS built for an auto body shop to manage content without developer involvement

<div>
  <a><img alt="Static Badge" src="https://img.shields.io/badge/Live_Site-%23dbffc3?style=for-the-badge"></a>
<a href="https://github.com/TechFataleFreelance/KB-s-Kustomz"><img alt="Static Badge" src="https://img.shields.io/badge/Old_Version_Repo-%23ababab?style=for-the-badge"></a>
  
# Description
KBs Kustomz is a website & content management system built to advertise auto body and painting services for KB's Kustomz located in Wyanet, IL. The website features a gallery, about us page, services page, and a contact us page, as well as a cms dashboard to eliminate manual content updates and allow the client to manage their own site.


### Before & After Photos

<img src="https://github.com/user-attachments/assets/4ca8b650-e1fd-4924-9145-bd7003d2be92" width="100%">
<img src="https://github.com/user-attachments/assets/df4f6529-8e27-440e-822f-af1790984361" width="100%">
<img src="https://github.com/user-attachments/assets/83070187-96a2-407b-880f-47c1a72269e9" width="100%">

# Features
- Client-managed CMS dashboard (upload/delete images)
- Role-based authentication (Admin vs General users)
- Image storage with Vercel Blob
- SEO-optimized multi-page structure
- Fully responsive mobile UI

<table>
  <tr>
    <th>Page</th>
    <th>View</th>
  </tr>

  <tr>
    <td>Dashboard Home</td>
    <td><img src="https://github.com/user-attachments/assets/923a46c9-bfad-4ca2-a678-32c7042c9be7" width="100%"></td>
  </tr>

  </table>
<br>

[<img alt="Static Badge" src="https://img.shields.io/badge/View_All_Feature_Snapshots-pink?style=for-the-badge">](FEATURE_SNAPSHOTS.md)


______
# Tech Stack
- `Next.js` (App router)
  - Framework used for creating the full-stack website
- `Next.js Blobs` (Storage)
  - Storage offered by Vercel is used to store the images my client updates (I hope to upgrade to Cloudinary if more storage is needed)
- `Supabase Database + OAuth`
  - Database used to authenticate and hold user information and roles, as well as image metadata + URLs
  - Integrated Google Auth for quicker sign-in
- `Tailwind CSS` + `ShadCN` User Interface Library
  - Used for quick & uniform styling and component building
______

# Key Improvements
- **Created a dashboard CMS** 'backend' that the client can use to manage the images anytime and anywhere. Using `NEXT` server-side capabilities, I created api routes that handled uploads to `NEXT` Blob storage and `Supabase.`
  - Solved the problem of manually adding the images to the site files]
  - converted the `SPA` (Single Page Application) to a `full-stack` web app
    <br>
    
- **leveraged caching & revalidating** to lighten the request load on the server and database API. added `fetchpriority` attributes to the appropriate HTML elements
  - Improved desktop and mobile site speed, first contentful paint (FCP), and largest contentful paint times
    <br>
    
- **Used media queries** to make the mobile UI clean, easy to navigate, and aesthetic
  - Solved the problem of the mobile site not formatting properly and made the mobile experience seamless
    <br>
- **implemented NEXT SEO capabilities** by making sure each public-facing page had SEO metadata (description, title), I made sure every image on the site had an ALT tag, added a `schemaMarkup` document for crawlers, and added an LLM doc as well for AI models. On private pages, I made sure search engines should not crawl the pages, setting the metadata to `robots: {index: false, follow: false}`
  - solved the challenge of making sure the site had sufficient SEO so the site could appear higher up on search engines like Google when crawled 

# Security Improvements
- Enabled row-level security (`RLS`) and created policies that dictate who is allowed to alter tables in `supabase.`
- Used server-side cookies to securely set and store user session tokens as opposed to being exposed on the client side
- whitelisted content sent from the client as a request in the middleware to combat injection attacks
- ran vulnerability scans periodically and updated to the most recently patched version of the compromised/deprecated library
- Enforced access control by setting up role-based access (RBA) to the database (`GENERAL` vs `ADMIN`) and using the **rule of least privilege**  
