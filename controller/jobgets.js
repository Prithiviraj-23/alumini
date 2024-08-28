const JobPosting = require("../models/job");
const Alumini_profile = require("../models/Alumini_profile_Schema");

const getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID =>", id); 

   
    const alumniDetails = await Alumini_profile.find().select("college _id firstName lastName");
    console.log("DET =>", alumniDetails);

   
    const jobPostings = await JobPosting.find({ postedBy: { $ne: id } });
    console.log(jobPostings);


    const finalDetail = await Promise.all(
      jobPostings.map(async (job) => {
        const alumni = alumniDetails.find(alumini => alumini._id.toString() === job.postedBy.toString());
        if (alumni) {
          return {
            college: alumni.college,
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            postedBy: alumni.firstName + " " + alumni.lastName,
            datePosted: job.datePosted,
            isActive: job.isActive,
            interviewType: job.interviewType,
          };
        }
      })
    );

  
    const filteredDetail = finalDetail.filter(detail => detail !== undefined);

    // Check if there are job postings
    if (!filteredDetail.length) {
      return res.status(404).json({ error: "Job postings not found" });
    }

    // Send the job postings as a response
    res.status(200).json(filteredDetail);
  } catch (err) {
    console.error("Error fetching job posting:", err);
    res.status(500).json({ error: "Error fetching job posting", details: err });
  }
};

module.exports = {
  getJobPostingById,
};
