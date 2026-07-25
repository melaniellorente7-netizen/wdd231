const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    {
      sectionNumber: 1,
      enrolled: 88,
      instructor: "Brother Bingham",
    },
    {
      sectionNumber: 2,
      enrolled: 81,
      instructor: "Sister Shultz",
    },
    {
      sectionNumber: 3,
      enrolled: 95,
      instructor: "Sister Smith",
    },
  ],
  changeEnrollment: function (sectionNumber, add = true) {
    // Find the section with the given section number
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNumber == sectionNumber
    );
    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
    }
    courseDiv.addEventListener('click', () => {
  displayCourseDetails(course);
});
  },
  
};

export default byuiCourse;

const courseDetails = document.querySelector('#course-details');

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}