*Author and Developer: [Kylee Brown](https://www.linkedin.com/in/kylee-brown-7167b9274/)*

# KB's Kustomz Website (Remodel)

### Modern fullstack website + CMS built for an auto body shop to manage content without developer involvement

### [Live Site](#)  
### [Old Version Repo](https://github.com/TechFataleFreelance/KB-s-Kustomz)

# Description
KBs Kustomz is a website & content management system built to advertise auto body and painting services for KB's Kustomz located in Wyanet, IL. The website features a gallery, about us page, services page, and a contact us page as well as a cms dashboard to eliminate manual content updates and allow the client to manage their own site.

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

# Key Improvements
- **Created a dashboard CMS** 'backend' that the client can use to manage the images anytime and anywhere wifi is availablee. Using `NEXT` server side capabailities, I created api routes that handled uploads to `NEXT` Blob storage and `Supabase`
  - Solved the proplem of manually adding the images to the site files]
  - converted the `SPA` (Single Page Application) to a `fullstack` web app
- **leveraged cachng & revalidating** to lighten the request load on the server and database API. added `fetchpriority` attributes to the appropriate HTML elements
  - Improved desktop and mobile site speed, first contentful paint (FCP) and largest contentful paint times
- **Used media queries** to make the mobile version UI clean, easy to navigate, and aesthetic
  - Solved the problem of the mobile site not formatting properly and made the mobile experience seanless
- **implemented NEXT SEO capabilities** by making sure each public-facing page had SEO meta data (description, title), I made sure every image on the site had an ALT tag, added a `schemaMarkup` document for crawlers, and added an LLM doc as well for AI models. On private pages, I made sure search engines should not crawl the pages setting the metadata to `robots: {index: false, follow: false}`
  - solved the challenge of making sure the site had the sufficient SEO so the site could appear higher up on search engines like Google when crawled 


# Security Improvements
- Enabled row level security (`RLS`) and created policies that dictate who is allowed to alter tables in `supabase`
- Used Server side to securely cookies to set and store user session tokens as opposed to being exposed on the clinet side
- whitelisted content sent from client as a request in the middleware to combat against injection attacks
- ran vulnerablility scans periodically and updated to the most recently patched version of the compromised/depricated library
- Enforced access control by setting up role based access (RBA) to the database (`GENERAL` vs `ADMIN`) and using the **rule of least privleged**


# Future Goals
1. Add an analytics dashboard tracking website traffic, click paths, etc.
2. Upgrade storage plans, or providers if needed (possibly cloudinary), if the storage limit is reached for `NEXT` Blobs
3. Upgrade Supabase plan if website traffic increasses to increase the amount of `Egress` and `Egress caching`
4. Upgrade to a paid custom domain

# Production
- Hosting is through a CI/CD process using `Github` + `Vercel`

# Currently...
- I continue to monitor the site and update any libraries as needed. 
- I frequently view the Supabase logs of the API calls being made to check for any descrepencies. The client is still able to freely contact me if any errors are occuring.  
