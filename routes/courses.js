var express = require('express');
var router = express.Router();
const Course = require("../models/Courses");

const sessionChecker = (req, res, next) => {
  if(req.session.user){
    res.locals.username = req.session.user.userName
    next();
  } else {
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker)

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // console.log(req.session.user)
  const courses = await Course.findAll();
  if(req.query.msg){
    res.locals.msg = req.query.msg;
    res.locals.courseId = req.query.courseId;
  }
  res.render('courses', { courses });
});

router.post('/create', async function(req, res, next) {
  try {
    await Course.create(
      {
      courseId: req.body.courseId, 
      courseName: req.body.courseName, 
      courseSemester: req.body.courseSemester,
      courseDescription: req.body.courseDescription, 
      courseEnrollNum: req.body.courseEnrollNum
      }
    );
  res.redirect('/courses?msg=success&courseId=' + req.body.courseId);
  } catch (error) {
    res.redirect('/courses?msg='+new URLSearchParams(error.toString()).toString()+'&courseId=' + req.body.courseId);
  }
  
});

router.get("/:courseId", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseId)
  if (course){
    res.render('courseDetails', { course });
  } else {
    res.redirect('/courses/?msg=course+not+found&courseId=' + req.params.courseId);
  }
  
});

router.get("/delete/:courseId", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseId)
  if (course){
    await course.destroy();
    res.redirect('/courses/?msg=successdelete&courseId=' + req.params.courseId);
  } else {
    res.redirect('/courses/?msg=course+not+found&courseId=' + req.params.courseId);
  }
  
});

module.exports = router;
