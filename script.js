// Resume Builder Application
class ResumeBuilder {
    constructor() {
        this.skills = [];
        this.experiences = [];
        this.education = [];
        this.projects = [];
        this.certifications = [];
        this.languages = [];
        this.experienceCounter = 0;
        this.educationCounter = 0;
        this.projectCounter = 0;

        this.initializeEventListeners();
        this.loadFromStorage();
    }

    initializeEventListeners() {
        // Header buttons
        document.getElementById('generateBtn').addEventListener('click', () => this.generateResume());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());

        // Skills
        document.getElementById('addSkillBtn').addEventListener('click', () => this.addSkill());
        document.getElementById('skillInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addSkill();
        });

        // Character counter
        document.getElementById('summary').addEventListener('input', (e) => {
            document.getElementById('charCount').textContent = e.target.value.length;
        });

        // Experience
        document.getElementById('addExperienceBtn').addEventListener('click', () => this.addExperienceForm());

        // Education
        document.getElementById('addEducationBtn').addEventListener('click', () => this.addEducationForm());

        // Projects
        document.getElementById('addProjectBtn').addEventListener('click', () => this.addProjectForm());

        // Certifications
        document.getElementById('addCertBtn').addEventListener('click', () => this.addCertification());
        document.getElementById('certInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addCertification();
        });

        // Languages
        document.getElementById('addLangBtn').addEventListener('click', () => this.addLanguage());
        document.getElementById('langInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addLanguage();
        });

        // Form submission
        document.getElementById('resumeForm').addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // Skills Management
    addSkill() {
        const input = document.getElementById('skillInput');
        const skill = input.value.trim();

        if (!skill) {
            alert('Please enter a skill');
            return;
        }

        if (this.skills.includes(skill)) {
            alert('This skill already exists');
            return;
        }

        this.skills.push(skill);
        input.value = '';
        this.renderSkills();
    }

    removeSkill(skill) {
        this.skills = this.skills.filter(s => s !== skill);
        this.renderSkills();
    }

    renderSkills() {
        const container = document.getElementById('skillsContainer');
        container.innerHTML = '';

        this.skills.forEach(skill => {
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `
                ${skill}
                <button type="button" onclick="resumeBuilder.removeSkill('${skill.replace(/'/g, "\\'")}')">×</button>
            `;
            container.appendChild(badge);
        });
    }

    // Experience Management
    addExperienceForm() {
        const container = document.getElementById('experienceContainer');
        const id = this.experienceCounter++;
        const experienceDiv = document.createElement('div');
        experienceDiv.className = 'experience-item';
        experienceDiv.id = `experience-${id}`;
        experienceDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="resumeBuilder.removeExperience(${id})">Remove</button>
            <h4>Experience Entry ${id + 1}</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="company-${id}" placeholder="Acme Corporation">
                </div>
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="jobTitle-${id}" placeholder="Senior Developer">
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="startDate-${id}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="endDate-${id}">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" class="currentWork-${id}"> Currently Working Here
                    </label>
                </div>
                <div class="form-group">
                    <label>Responsibilities</label>
                    <textarea class="responsibilities-${id}" placeholder="Describe your responsibilities..."></textarea>
                </div>
            </div>
        `;
        container.appendChild(experienceDiv);
    }

    removeExperience(id) {
        const element = document.getElementById(`experience-${id}`);
        if (element) element.remove();
    }

    getExperiences() {
        const container = document.getElementById('experienceContainer');
        const items = [];

        container.querySelectorAll('.experience-item').forEach((item, index) => {
            const company = item.querySelector(`.company-${item.id.split('-')[1]}`)?.value || '';
            const jobTitle = item.querySelector(`.jobTitle-${item.id.split('-')[1]}`)?.value || '';
            const startDate = item.querySelector(`.startDate-${item.id.split('-')[1]}`)?.value || '';
            const endDate = item.querySelector(`.endDate-${item.id.split('-')[1]}`)?.value || '';
            const currentWork = item.querySelector(`.currentWork-${item.id.split('-')[1]}`)?.checked || false;
            const responsibilities = item.querySelector(`.responsibilities-${item.id.split('-')[1]}`)?.value || '';

            if (company || jobTitle) {
                items.push({
                    company,
                    jobTitle,
                    startDate,
                    endDate: currentWork ? 'Present' : endDate,
                    currentWork,
                    responsibilities
                });
            }
        });

        return items;
    }

    // Education Management
    addEducationForm() {
        const container = document.getElementById('educationContainer');
        const id = this.educationCounter++;
        const educationDiv = document.createElement('div');
        educationDiv.className = 'education-item';
        educationDiv.id = `education-${id}`;
        educationDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="resumeBuilder.removeEducation(${id})">Remove</button>
            <h4>Education Entry ${id + 1}</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" class="institution-${id}" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="degree-${id}" placeholder="B.Tech in Computer Science">
                </div>
                <div class="form-group">
                    <label>Start Year</label>
                    <input type="number" class="eduStartYear-${id}" placeholder="2018" min="1950" max="2100">
                </div>
                <div class="form-group">
                    <label>End Year</label>
                    <input type="number" class="eduEndYear-${id}" placeholder="2022" min="1950" max="2100">
                </div>
                <div class="form-group">
                    <label>Score/CGPA (Optional)</label>
                    <input type="text" class="score-${id}" placeholder="9.0/10 or 3.9/4.0">
                </div>
            </div>
        `;
        container.appendChild(educationDiv);
    }

    removeEducation(id) {
        const element = document.getElementById(`education-${id}`);
        if (element) element.remove();
    }

    getEducation() {
        const container = document.getElementById('educationContainer');
        const items = [];

        container.querySelectorAll('.education-item').forEach((item) => {
            const institution = item.querySelector(`.institution-${item.id.split('-')[1]}`)?.value || '';
            const degree = item.querySelector(`.degree-${item.id.split('-')[1]}`)?.value || '';
            const startYear = item.querySelector(`.eduStartYear-${item.id.split('-')[1]}`)?.value || '';
            const endYear = item.querySelector(`.eduEndYear-${item.id.split('-')[1]}`)?.value || '';
            const score = item.querySelector(`.score-${item.id.split('-')[1]}`)?.value || '';

            if (institution || degree) {
                items.push({
                    institution,
                    degree,
                    startYear,
                    endYear,
                    score
                });
            }
        });

        return items;
    }

    // Projects Management
    addProjectForm() {
        const container = document.getElementById('projectsContainer');
        const id = this.projectCounter++;
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.id = `project-${id}`;
        projectDiv.innerHTML = `
            <button type="button" class="remove-btn" onclick="resumeBuilder.removeProject(${id})">Remove</button>
            <h4>Project ${id + 1}</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" class="projTitle-${id}" placeholder="E-commerce Platform">
                </div>
                <div class="form-group">
                    <label>Tech Stack</label>
                    <input type="text" class="techStack-${id}" placeholder="React, Node.js, MongoDB">
                </div>
                <div class="form-group full-width">
                    <label>Description</label>
                    <textarea class="projDescription-${id}" placeholder="Describe your project..."></textarea>
                </div>
                <div class="form-group">
                    <label>Live Link (Optional)</label>
                    <input type="url" class="liveLink-${id}" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label>Repository Link (Optional)</label>
                    <input type="url" class="repoLink-${id}" placeholder="https://github.com/...">
                </div>
            </div>
        `;
        container.appendChild(projectDiv);
    }

    removeProject(id) {
        const element = document.getElementById(`project-${id}`);
        if (element) element.remove();
    }

    getProjects() {
        const container = document.getElementById('projectsContainer');
        const items = [];

        container.querySelectorAll('.project-item').forEach((item) => {
            const projTitle = item.querySelector(`.projTitle-${item.id.split('-')[1]}`)?.value || '';
            const techStack = item.querySelector(`.techStack-${item.id.split('-')[1]}`)?.value || '';
            const projDescription = item.querySelector(`.projDescription-${item.id.split('-')[1]}`)?.value || '';
            const liveLink = item.querySelector(`.liveLink-${item.id.split('-')[1]}`)?.value || '';
            const repoLink = item.querySelector(`.repoLink-${item.id.split('-')[1]}`)?.value || '';

            if (projTitle || techStack) {
                items.push({
                    projTitle,
                    techStack,
                    projDescription,
                    liveLink,
                    repoLink
                });
            }
        });

        return items;
    }

    // Certifications Management
    addCertification() {
        const input = document.getElementById('certInput');
        const cert = input.value.trim();

        if (!cert) {
            alert('Please enter a certification');
            return;
        }

        if (this.certifications.includes(cert)) {
            alert('This certification already exists');
            return;
        }

        this.certifications.push(cert);
        input.value = '';
        this.renderCertifications();
    }

    removeCertification(cert) {
        this.certifications = this.certifications.filter(c => c !== cert);
        this.renderCertifications();
    }

    renderCertifications() {
        const container = document.getElementById('certsContainer');
        container.innerHTML = '';

        this.certifications.forEach(cert => {
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `
                ${cert}
                <button type="button" onclick="resumeBuilder.removeCertification('${cert.replace(/'/g, "\\'")}')">×</button>
            `;
            container.appendChild(badge);
        });
    }

    // Languages Management
    addLanguage() {
        const input = document.getElementById('langInput');
        const lang = input.value.trim();

        if (!lang) {
            alert('Please enter a language');
            return;
        }

        if (this.languages.includes(lang)) {
            alert('This language already exists');
            return;
        }

        this.languages.push(lang);
        input.value = '';
        this.renderLanguages();
    }

    removeLanguage(lang) {
        this.languages = this.languages.filter(l => l !== lang);
        this.renderLanguages();
    }

    renderLanguages() {
        const container = document.getElementById('langsContainer');
        container.innerHTML = '';

        this.languages.forEach(lang => {
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.innerHTML = `
                ${lang}
                <button type="button" onclick="resumeBuilder.removeLanguage('${lang.replace(/'/g, "\\'")}')">×</button>
            `;
            container.appendChild(badge);
        });
    }

    // Validation
    validate() {
        let isValid = true;
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const summary = document.getElementById('summary');

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.classList.remove('show');
            msg.parentElement.classList.remove('error');
        });

        // Name validation
        if (!fullName.value.trim()) {
            this.showError('nameError', 'Full name is required');
            isValid = false;
        }

        // Email validation
        if (!email.value.trim()) {
            this.showError('emailError', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email.value)) {
            this.showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Phone validation
        if (!phone.value.trim()) {
            this.showError('phoneError', 'Phone is required');
            isValid = false;
        } else if (!this.isValidPhone(phone.value)) {
            this.showError('phoneError', 'Phone must be at least 10 digits');
            isValid = false;
        }

        // Summary validation
        if (!summary.value.trim()) {
            this.showError('summaryError', 'Summary is required');
            isValid = false;
        }

        return isValid;
    }

    showError(errorId, message) {
        const errorEl = document.getElementById(errorId);
        const inputGroup = errorEl.parentElement;
        errorEl.textContent = message;
        errorEl.classList.add('show');
        inputGroup.classList.add('error');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\d{10,}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    // Generate Resume
    generateResume() {
        if (!this.validate()) {
            alert('Please fix the validation errors');
            return;
        }

        const data = this.collectFormData();
        const resumeHTML = this.buildResumeHTML(data);
        document.getElementById('resumePreview').innerHTML = resumeHTML;
        
        // Save to localStorage
        this.saveToStorage(data);
    }

    collectFormData() {
        return {
            fullName: document.getElementById('fullName').value,
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            summary: document.getElementById('summary').value,
            skills: this.skills,
            experiences: this.getExperiences(),
            education: this.getEducation(),
            projects: this.getProjects(),
            certifications: this.certifications,
            languages: this.languages,
            hobbies: document.getElementById('hobbies').value
        };
    }

    buildResumeHTML(data) {
        let html = '<div class="resume-doc">';

        // Header
        html += `
            <div class="resume-header">
                <div class="resume-name">${this.escapeHtml(data.fullName)}</div>
                <div class="resume-role">${this.escapeHtml(data.role)}</div>
                <div class="resume-contact">
                    ${data.location ? `<div class="resume-contact-item">📍 ${this.escapeHtml(data.location)}</div>` : ''}
                    <div class="resume-contact-item">📧 ${this.escapeHtml(data.email)}</div>
                    <div class="resume-contact-item">📱 ${this.escapeHtml(data.phone)}</div>
                    ${data.linkedin ? `<div class="resume-contact-item"><a href="${this.escapeHtml(data.linkedin)}" target="_blank">LinkedIn</a></div>` : ''}
                    ${data.github ? `<div class="resume-contact-item"><a href="${this.escapeHtml(data.github)}" target="_blank">GitHub</a></div>` : ''}
                </div>
            </div>
        `;

        // Summary
        if (data.summary) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">Professional Summary</div>
                    <div class="resume-summary">${this.escapeHtml(data.summary)}</div>
                </div>
            `;
        }

        // Skills
        if (data.skills.length > 0) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">Skills</div>
                    <div class="resume-skills">
                        ${data.skills.map(skill => `<div class="resume-skill-badge">${this.escapeHtml(skill)}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        // Experience
        if (data.experiences.length > 0) {
            html += '<div class="resume-section"><div class="resume-section-title">Professional Experience</div>';
            data.experiences.forEach(exp => {
                html += `
                    <div class="resume-entry">
                        <div class="resume-entry-title">${this.escapeHtml(exp.jobTitle)}</div>
                        <div class="resume-entry-subtitle">${this.escapeHtml(exp.company)}</div>
                        <div class="resume-entry-meta">${exp.startDate} - ${exp.endDate}</div>
                        ${exp.responsibilities ? `<div class="resume-entry-description">${this.escapeHtml(exp.responsibilities).replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            });
            html += '</div>';
        }

        // Projects
        if (data.projects.length > 0) {
            html += '<div class="resume-section"><div class="resume-section-title">Projects</div>';
            data.projects.forEach(proj => {
                html += `
                    <div class="resume-entry">
                        <div class="resume-entry-title">${this.escapeHtml(proj.projTitle)}</div>
                        <div class="resume-entry-subtitle">${this.escapeHtml(proj.techStack)}</div>
                        ${proj.projDescription ? `<div class="resume-entry-description">${this.escapeHtml(proj.projDescription)}</div>` : ''}
                        <div class="resume-entry-meta">
                            ${proj.liveLink ? `<a href="${this.escapeHtml(proj.liveLink)}" target="_blank">Live</a>` : ''}
                            ${proj.liveLink && proj.repoLink ? ' | ' : ''}
                            ${proj.repoLink ? `<a href="${this.escapeHtml(proj.repoLink)}" target="_blank">Repository</a>` : ''}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }

        // Education
        if (data.education.length > 0) {
            html += '<div class="resume-section"><div class="resume-section-title">Education</div>';
            data.education.forEach(edu => {
                html += `
                    <div class="resume-entry">
                        <div class="resume-entry-title">${this.escapeHtml(edu.degree)}</div>
                        <div class="resume-entry-subtitle">${this.escapeHtml(edu.institution)}</div>
                        <div class="resume-entry-meta">${edu.startYear} - ${edu.endYear}</div>
                        ${edu.score ? `<div class="resume-entry-meta">GPA/Score: ${this.escapeHtml(edu.score)}</div>` : ''}
                    </div>
                `;
            });
            html += '</div>';
        }

        // Certifications
        if (data.certifications.length > 0) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">Certifications</div>
                    <div class="resume-skills">
                        ${data.certifications.map(cert => `<div class="resume-skill-badge">${this.escapeHtml(cert)}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        // Languages
        if (data.languages.length > 0) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">Languages</div>
                    <div class="resume-skills">
                        ${data.languages.map(lang => `<div class="resume-skill-badge">${this.escapeHtml(lang)}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        // Hobbies
        if (data.hobbies.trim()) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title">Hobbies & Interests</div>
                    <div class="resume-summary">${this.escapeHtml(data.hobbies)}</div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Clear Form
    clearForm() {
        if (confirm('Are you sure you want to clear all data?')) {
            document.getElementById('resumeForm').reset();
            this.skills = [];
            this.certifications = [];
            this.languages = [];
            this.experienceCounter = 0;
            this.educationCounter = 0;
            this.projectCounter = 0;

            document.getElementById('skillsContainer').innerHTML = '';
            document.getElementById('experienceContainer').innerHTML = '';
            document.getElementById('educationContainer').innerHTML = '';
            document.getElementById('projectsContainer').innerHTML = '';
            document.getElementById('certsContainer').innerHTML = '';
            document.getElementById('langsContainer').innerHTML = '';
            document.getElementById('resumePreview').innerHTML = '<p class="preview-empty">Click "Generate Resume" to see preview</p>';
            document.getElementById('charCount').textContent = '0';

            localStorage.removeItem('resumeData');
        }
    }

    // Download PDF
    downloadPDF() {
        const previewContent = document.getElementById('resumePreview');
        if (previewContent.innerHTML.includes('preview-empty')) {
            alert('Please generate resume first');
            return;
        }

        const printWindow = window.open('', '', 'width=900,height=1200');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: 'Calibri', Arial, sans-serif; color: #1e293b; line-height: 1.5; padding: 20px; }
                    .resume-doc { max-width: 8.5in; margin: 0 auto; }
                    .resume-header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 15px; }
                    .resume-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
                    .resume-role { font-size: 14px; color: #2563eb; font-weight: bold; margin-bottom: 10px; }
                    .resume-contact { font-size: 11px; display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; }
                    .resume-section { margin-bottom: 15px; }
                    .resume-section-title { font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase; }
                    .resume-summary { font-size: 11px; line-height: 1.5; }
                    .resume-skills { display: flex; flex-wrap: wrap; gap: 8px; }
                    .resume-skill-badge { display: inline-block; padding: 4px 10px; background: #2563eb; color: white; border-radius: 12px; font-size: 10px; }
                    .resume-entry { margin-bottom: 10px; }
                    .resume-entry-title { font-weight: bold; font-size: 11px; }
                    .resume-entry-subtitle { font-style: italic; color: #64748b; font-size: 10px; }
                    .resume-entry-meta { font-size: 10px; color: #64748b; margin-top: 3px; }
                    .resume-entry-description { font-size: 10px; margin-top: 5px; }
                    a { color: #2563eb; text-decoration: none; }
                </style>
            </head>
            <body>
                ${previewContent.innerHTML}
                <script>
                    window.print();
                    window.close();
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Storage Management
    saveToStorage(data) {
        localStorage.setItem('resumeData', JSON.stringify(data));
    }

    loadFromStorage() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.populateForm(data);
        }
    }

    populateForm(data) {
        document.getElementById('fullName').value = data.fullName || '';
        document.getElementById('role').value = data.role || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('location').value = data.location || '';
        document.getElementById('linkedin').value = data.linkedin || '';
        document.getElementById('github').value = data.github || '';
        document.getElementById('summary').value = data.summary || '';
        document.getElementById('charCount').textContent = (data.summary || '').length;
        document.getElementById('hobbies').value = data.hobbies || '';

        // Restore skills
        this.skills = data.skills || [];
        this.renderSkills();

        // Restore certifications
        this.certifications = data.certifications || [];
        this.renderCertifications();

        // Restore languages
        this.languages = data.languages || [];
        this.renderLanguages();

        // Restore experiences
        if (data.experiences) {
            data.experiences.forEach(() => {
                this.addExperienceForm();
            });
        }

        // Restore education
        if (data.education) {
            data.education.forEach(() => {
                this.addEducationForm();
            });
        }

        // Restore projects
        if (data.projects) {
            data.projects.forEach(() => {
                this.addProjectForm();
            });
        }
    }
}

// Initialize the application
const resumeBuilder = new ResumeBuilder();
