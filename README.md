*Author and Developer: [Kylee Brown](https://www.linkedin.com/in/kylee-brown-7167b9274/)*


# Summary
This is a remodeling of an original website I created for a client a little over a year ago while freelancing ([Link to old repo here](https://github.com/TechFataleFreelance/KB-s-Kustomz)). My client needed a website to advertise his Car services and wanted to send me assets to update the site periodically. Using this information, I opted to create a static, single page application (SPA) using React.js as the Library and Vite as the build tool. 

Eventually the client needed more frequent image uploads as they received more clients themselves, and the process of sending me the images started to become more difficult as both of our schedules were busy. This exact issue is what lead me to remodel the website to create a site that allows my client to login and update site assets themselves using a backend content management system I developed. 

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

# Challenges with the OLD site

1. The first callenge that occured after the old site went into production was the time it took to upload the images the client had sent me. I had to drag each asset into the project and update the gallery HTML by hand adding the new images.
2. The second challenge was making sure the site had the sufficient SEO so the site could appear higher up on search engines like Google when crawled
3. The third challenge was site speed, the pages were loading at a decent rate but updates needed to be made to improve it
6. Lastly, the mobile site UI could definately be more clean anaesthetically pleasing 

# Solutions implemented on the NEW site
1. I created a dashboard CMS 'backend' to the site that the client can use to update the images anytime and anywhere wifi is available on desktop or mobile. I leveraged NEXT server side capabailities and created api routes that handled uploads to NEXT Blob storage and Supabase
2. I leveraged NEXT multiple page SEO capabilities by making sure each public-facing page had propper SEO. I made sure every image on the site had an ALT tag, added a `schemaMarkup` document for crawlers, and added an LLM doc as well. On private pages, I made sure search engines should not crawl the pages setting the metadata to `robots: {index: false, follow: false}`
3. I leveraged cachng & revalidating on the client end so the data being fetched from the database are only revalidated when the client has uploaded or made changes. I also set priority attributes to low on the html tags for any assets below the fold and high for assets above the fold
4. Lastly, I leveraged media queries to make the mobile version UI clean, easy to navigate, and aesthetic

# Security

- Enabled row level security (`RLS`) and created policies that dictate who is able to alter tables in `supabase`
- whitelisted content sent from client as a request in the middleware to combat against injection attacks
- ran vulnerablility scans periodically and update to the most recently patched version of the compromised/depricated library
- Enforced access control by setting up role based access (RBA) to the database (`GENERAL` vs `ADMIN`) and using the **rule of least privleged**
- Required `2FA` for users

# Scaling

1. Add an analytics dashboard tracking website traffic, click paths, etc.
2. Upgrade storage plans, or providers if needed (possibly cloudinary), if the storage limit is reached for NEXT Blobs
3. Upgrade Supabase plan if website traffic increasses to increase the amount of Egress and Egress caching
4. Upgrade to a paid custom domain

# Production
- Hosting is a CI/CD process using `Github` + `Vercel`

# Conclusion
- I continue to monitor the site and update any libraries as needed. 
- I frequently view the Supabase logs of the API calls being made to check for any descrepencies. The client is still able to freely contact me if any errors are occuring.  
