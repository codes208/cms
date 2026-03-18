const sequelize = require('../db');
const { DataTypes, Model } = require('sequelize');

class Course extends Model {
    static async findCourse(courseId){
        try{
            const course = await Course.findByPk(courseId);
            return course ? course : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

Course.init({
    courseId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseSemester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    courseEnrollNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Course'
  },
);

module.exports = Course;
