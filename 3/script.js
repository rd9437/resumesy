function generatePDF() {
  //Header
  const nameInput = document.getElementById("name");
  const cityInput = document.getElementById("city");
  const countryInput = document.getElementById("country");
  const linkedinInput = document.getElementById("linkedin");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  //Work expereience
  const jobTitleInput = document.getElementById("job_title");
  const employerInput = document.getElementById("employer");
  const workCityInput = document.getElementById("work_city");
  const workCountryInput = document.getElementById("work_country");
  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const summaryInput1 = document.getElementById("summary1");
  const summaryInput = document.getElementById("summary");
  //skill
  const skillsInput = document.getElementById("skills");
  //profile photo
  const photoInput = document.getElementById("photo");
  //educational background
  const degreeInput = document.getElementById("degree");
  const universityInput = document.getElementById("university");
  const eduCityInput = document.getElementById("edu_city");
  const eduCountryInput = document.getElementById("edu_country");
  const eduStartDateInput = document.getElementById("edu_start_date");
  const eduEndDateInput = document.getElementById("edu_end_date");

  

  const name = nameInput.value;
  const city = cityInput.value;
  const country = countryInput.value;
  const linkedin = linkedinInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const jobTitle = jobTitleInput.value;
  const employer = employerInput.value;
  const workCity = workCityInput.value;
  const workCountry = workCountryInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const summary1 = summaryInput1.value;
  const summary = summaryInput.value;
  const photo = photoInput.files[0];
  const skills = skillsInput.value.split(',').map(skill => skill.trim());
  const degree = degreeInput.value;
  const university = universityInput.value;
  const eduCity = eduCityInput.value;
  const eduCountry = eduCountryInput.value;
  const eduStartDate = eduStartDateInput.value;
  const eduEndDate = eduEndDateInput.value;

  const pdf = new jsPDF(); 

  pdf.setDocumentProperties({ title: "My Resume" });

  pdf.setLineWidth(1); // Set border line width
  pdf.rect(5, 5, 200, 280); 

  pdf.setLineWidth(0.2); // Set line width
  pdf.line(82, 65, 82, 260); 


  const x = 7; 
  const y = 65;
  const width = 74;
  const height = 68; 
  pdf.setFillColor(255, 255, 204); 
  pdf.rect(x, y, width, height, 'F');
  
  pdf.setFontSize(24); 
  pdf.setFont("Comic Sans MS", "bold");
  pdf.text(name, 90, 25);

  pdf.setFontSize(16); 
  pdf.setFont("helvetica", "bold");

  pdf.text("CONTACT", 10, 75);

  pdf.setFont("Comic Sans MS", "normal");
  pdf.setFontSize(14); 

  pdf.text(city, 10, 88);
  pdf.text(country, 10, 94);
  pdf.text("Phone:"+ phone, 10, 104);
  pdf.text(email, 10, 114);
  pdf.text(linkedin, 10, 124);

  pdf.setFont("helvetica", "bold");

  if (skills.length > 0) {
    pdf.setFontSize(14);
    const skillsHeight = pdf.getTextWidth("SKILLS") + 5; 
    pdf.text("SKILLS", 10, 145);
    if (skills.every(skill => skill.trim() === "")) {
    } else {
      pdf.setFont("helvetica", "bold");
      const startY = 130 + skillsHeight; 

      for (let i = 0; i < skills.length; i++) {
        const y = startY + (i * 10); 
        pdf.text('\u2022 ' + skills[i], 10, y);
      }
    }
  }
  
  pdf.setFontSize(16); 
  pdf.setFont("helvetica", "bold");
  pdf.text("PROFESSIONAL SUMMARY", 85, 70);
  
  pdf.setFontSize(14); 
  pdf.setFont("helvetica", "normal");

  pdf.text(summary, 85, 80, { align: 'justify', maxWidth: 100 });
  
  pdf.setFont("helvetica", "bold");

  pdf.text("PROFESSIONAL EXPERIENCE", 85, 140);

  pdf.text(jobTitle, 90, 150);

  pdf.setFont("helvetica", "normal");

  pdf.text("Start Date:"+ startDate + "--" + endDate, 90, 160);
  
  
  pdf.text(employer, 90, 170);

  pdf.text("City: " + workCity + ", " + workCountry, 90, 180);

  pdf.text(summary1, 90, 190, { align: 'justify', maxWidth: 100 });

  
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("EDUCATION", 85, 230);

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "normal");

  pdf.text(degree, 90, 240);
  pdf.text(university, 90, 250);
  pdf.text("Location: " + eduCity + ", " + eduCountry, 90, 260);
  pdf.text("Duration: " + eduStartDate + " - " + eduEndDate, 90, 270);




  
  if (photo && photo.type.startsWith('image')) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const imageData = reader.result;
      pdf.addImage(imageData, 'JPEG', 10, 10, 50, 50);
      pdf.save("MyResume.pdf");
    };
    reader.readAsDataURL(photo);
  } else {
    pdf.save("MyResume.pdf");
  }
}
