# Gumroad Challenge

I decided on a MERN stack for my app. From there it was pretty straightforward to set up the API and controller in Express. The simplicity of the persistent data required for this project made a document database an easy choice. Making use of MongoDB’s free-tier cloud service also streamlined deployment.

Housing the frontend and backend in a mono-repo posed some challenges during deployment. Initially, I attempted to separate the frontend and backend into two servers where the former would proxy to the latter. I ran into some issues when deploying to Heroku with this approach that I, frankly, think just stemmed from my limited understanding of some of the magic Heroku performs under the hood. Eventually, I ended up with one server where I build the React project have non-API routes serve static files. In hindsight, this method seems ideal for such a simple web app, but I would like to revisit this at some point and investigate what I had overlooked with my first approach.

If I did it again, I would use [Mongoose](https://mongoosejs.com/) to model my data more strictly. Inserting JSON directly into the database is fun, but has consequences. While testing I ran into an issue where some rating numbers were inserted that had been formatted as strings, breaking my UI and throwing me for a loop until I discovered the bad data.

## Local Quickstart
  Add `.env` to project root and specify `MONGODB_URI`
   ```
   cd ./frontend/
   npm run build
   cd ..
   npm start
   ```
  
## Live Demo
https://gumroadchallenge.herokuapp.com/
