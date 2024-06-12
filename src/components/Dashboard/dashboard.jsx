import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate ();
  const [isLightMode, setIsLightMode] = useState(false);
  const [cours, setCours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [titre, setTitre] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState('');
  const [editingCourseID, setEditingCourseID] = useState('');
  const { id } = useParams();


  // Fonction pour ouvrir la modale
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal2 = (course) => {
  setEditingCourseID(course.id);
    setIsModalOpen2(true);
  };


  const handleDelete = async (editingCourseID) => {
    try {
        await axios.delete('http://localhost:8083/cours/' + editingCourseID);
        window.location.reload(); // Utilisez window.location.reload() pour recharger la page
    } catch (err) {
        console.log(err);
    }
}


  // Fonction pour fermer la modale
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  useEffect(() => {
    axios
      .get('http://localhost:8083/cours')
      .then((res) => setCours(res.data))
      .catch((err) => console.log(err));
  }, []);

  //partie js
  const handleModeSwitch = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setDocument(file); // Stocker le fichier dans l'état
    }
  };
  

 


  useEffect(() => {
    if (isModalOpen2 && editingCourseID) {
        axios.get(`http://localhost:8083/course/${editingCourseID}`)
            .then(res => {
                const courseData = res.data;
                setCode(courseData.code || ''); 
                setTitre(courseData.titre || ''); 
                setDescription(courseData.description || ''); 
                setDocument(courseData.document || ''); 
            })
            .catch(err => console.log(err));
    }
}, [isModalOpen, editingCourseID]);



  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8083/cours/${editingCourseID}`, {
        titre,
        code,
        description,
        document,
      })
      .then((res) => {
        console.log("hhhhhhhhhhh");
        console.log(editingCourseID);
        console.log(res);
        window.location.reload();
        closeModal2(); // Close modal after successful submission
      })
      .catch((err) => console.log(err));
  };
  
  /*useEffect(() => {
    
  });
  useEffect(() => {
    var modeSwitch = document.querySelector('.mode-switch');
    modeSwitch.addEventListener('click', function () {
      document.documentElement.classList.toggle('light');
      modeSwitch.classList.toggle('active');
    });
    document.querySelector('.jsFilter').addEventListener('click', function () {
      document.querySelector('.filter-menu').classList.toggle('active');
    });

    document.querySelector('.grid').addEventListener('click', function () {
      document.querySelector('.list').classList.remove('active');
      document.querySelector('.grid').classList.add('active');
      document
        .querySelector('.products-area-wrapper')
        .classList.add('gridView');
      document
        .querySelector('.products-area-wrapper')
        .classList.remove('tableView');
    });

    document.querySelector('.list').addEventListener('click', function () {
      document.querySelector('.list').classList.add('active');
      document.querySelector('.grid').classList.remove('active');
      document
        .querySelector('.products-area-wrapper')
        .classList.remove('gridView');
      document
        .querySelector('.products-area-wrapper')
        .classList.add('tableView');
    });
  }, []);*/
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8083/create', {
        titre,
        code,
        description,
        document,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
        setIsModalOpen(false); // Close modal after successful submission
        
        // Optionally update state or fetch data again
      })
      .catch((err) => console.log(err));
  };



  
  return (
    <div>
      <div className="app-container">
      <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z"
                />
              </svg>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Accueil</span>
              </a>
            </li>
            <li className="sidebar-list-item active">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6" />
                  <path d="M4 6l8 4 8-4" />
                </svg>

                <span>Cours</span>
              </a>
            </li>
            <li className="sidebar-list-item ">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 3H3v18h18V3zM10 17h4m-2-4h4M6 9h12M6 12h6" />
                </svg>

                <span>Examens</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="12" y2="16" />
                  <line x1="12" y1="16" x2="16" y2="8" />
                </svg>

                <span>notes</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span>Notifications</span>
              </a>
            </li>
          </ul>
          
        </div>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Cours</h1>
            <button
              className={`mode-switch ${isLightMode ? 'active' : ''}`}
              title="Switch Theme"
              onClick={handleModeSwitch}
            >
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <button className="app-content-headerButton" onClick={openModal}>
              Ajouter cours
            </button>
          </div>
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Search..." type="text" />
            <div className="app-content-actions-wrapper">
              <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter">
                  <span>Filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-filter"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
                <div className="filter-menu">
                  <label>Category</label>
                  <select>
                    <option>All Categories</option>
                    <option>Furniture</option> <option>Decoration</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                  </select>
                  <label>Status</label>
                  <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                  <div className="filter-menu-buttons">
                    <button className="filter-button reset">Reset</button>
                    <button className="filter-button apply">Apply</button>
                  </div>
                </div>
              </div>
              <button className="action-button list active" title="List View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button className="action-button grid" title="Grid View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>
          <table className="products-area-wrapper tableView">
            <thead>
              <tr>
                <th>
                  <div className="product-cell status-cell">
                    Code
                    <button className="sort-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                        />
                      </svg>
                    </button>
                  </div>{' '}
                </th>
                <th>
                  <div className="product-cell category">
                    Titre
                    <button className="sort-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="product-cell status-cell">
                    Description
                    <button className="sort-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  {' '}
                  <div className="product-cell sales">
                    Document
                    <button className="sort-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="product-cell stock">
                    Date
                    <button className="sort-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="product-cell stock">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cours.map((cour, i) => (
                <tr key={i}>
                  <td>
                    <div className="product-cell image">
                      <img
                        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/education-logo-design-template-2c5a88da5297f93c76419762018c3b04_screen.jpg?ts=1669384254"
                        alt="product"
                      />
                      <span>{cour.code}</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-cell category">
                      <span className="cell-label">Titre:</span>
                      {cour.titre}
                    </div>
                  </td>
                  <td>
                    <div className="product-cell status-cell">
                      <span className="cell-label">Description:</span>
                      <span>{cour.description}</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-cell stock">
                      <span className="cell-label">Document:</span>
                      {cour.document}
                    </div>
                  </td>
                  <td>
                    <div className="product-cell price">
                      <span className="cell-label">Date:</span>
                      {cour.date}
                    </div>
                  </td>
                  <td>
                    <div className="product-cell ">
                      {/* Bouton Supprimer */}
                      <button className="custom-button delete-button" onClick={e=>handleDelete(cour.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0,0,256,256"
                        >
                          <g fill="#faf5f5">
                            <g transform="scale(5.33333,5.33333)">
                              <path d="M20.5,4c-0.49034,-0.00628 -0.95279,0.22749 -1.23848,0.62606c-0.28569,0.39856 -0.35854,0.9116 -0.19511,1.37394h-4.42578c-1.83725,0 -3.5577,0.91945 -4.57617,2.44922l-2.36719,3.55078h-0.19727c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h0.76367c0.12867,0.01945 0.25932,0.02208 0.38867,0.00781l2.47266,23.07813c0.29835,2.78234 2.67084,4.91406 5.46875,4.91406h14.81055c2.79791,0 5.1704,-2.13172 5.46875,-4.91406l2.47461,-23.07813c0.12677,0.01359 0.25475,0.01097 0.38086,-0.00781h0.77148c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-0.19727l-2.36719,-3.55078c-1.01929,-1.52894 -2.73955,-2.44922 -4.57617,-2.44922h-4.42578c0.16343,-0.46234 0.09058,-0.97538 -0.19511,-1.37394c-0.28569,-0.39856 -0.74814,-0.63234 -1.23848,-0.62606zM14.64063,9h18.71875c0.83737,0 1.61537,0.41622 2.08008,1.11328l1.25781,1.88672h-25.39453l1.25781,-1.88672c0.00065,-0.00065 0.0013,-0.0013 0.00195,-0.00195c0.46348,-0.69619 1.23938,-1.11133 2.07813,-1.11133zM11.66992,15h24.66016l-2.43945,22.76563c-0.13765,1.28366 -1.19624,2.23438 -2.48633,2.23438h-14.81055c-1.29009,0 -2.34673,-0.95071 -2.48437,-2.23437z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                      {/* Bouton Modifier */}
                      <button
                        className="custom-button edit-button"
                        onClick={() => openModal2(cour)}

                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0,0,300,150"
                        >
                          <g fill="#fffbfb">
                            <g transform="scale(5.12,5.12)">
                              <path d="M43.05078,1.97461c-1.25,0 -2.50117,0.47578 -3.45117,1.42578l-0.79883,0.79883l6.89844,6.90039l0.80078,-0.79883c1.9,-1.9 1.9,-5.00039 0,-6.90039c-0.95,-0.95 -2.19922,-1.42578 -3.44922,-1.42578zM37.48242,6.08984c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-32.5,32.39844c-0.12561,0.12459 -0.21592,0.28028 -0.26172,0.45117l-2,7.5c-0.09232,0.34503 0.00638,0.71311 0.25894,0.96567c0.25256,0.25256 0.62064,0.35126 0.96567,0.25894l7.5,-2c0.17089,-0.0458 0.32658,-0.13611 0.45117,-0.26172l32.39844,-32.5c0.27003,-0.24913 0.38172,-0.62626 0.29091,-0.98226c-0.09081,-0.356 -0.36951,-0.63354 -0.72588,-0.72288c-0.35637,-0.08934 -0.73304,0.02392 -0.98104,0.29498l-32.19922,32.29883l-4.08594,-4.08594l32.29883,-32.19922c0.29665,-0.28678 0.38672,-0.7263 0.2268,-1.10666c-0.15992,-0.38035 -0.53701,-0.62345 -0.94946,-0.61209z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen &&  (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Contenu de votre modale (formulaire, etc.) */}
            <div className="modal-content">
              <h2 className="titre">Ajouter un nouveau cours</h2>
              <form className="form" onSubmit={handleSubmit}>
                <label className="titre">Code:</label>
                <input
                  type="text"
                  placeholder="saisir code"
                  onChange={(e) => setCode(e.target.value)}
                />
                <br></br>
                <label className="titre">Titre:</label>
                <input
                  type="text"
                  placeholder="saisir titre"
                  onChange={(e) => setTitre(e.target.value)}
                />
                <br></br>
                <label className="titre">Description:</label>
                <textarea
                  type="text"
                  placeholder="saisir description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br></br>
                <label className="titre">document:</label>
                <input
                  type="file"
                  className="titre"
                  onChange={(e) => setDocument(e.target.value)}
                />
                <br></br>
                <br></br>
                <button type="submit">Enregistrer</button>
              </form>
            </div>
            {/* Bouton pour fermer la modal */}
            <button className="modal-close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
      {isModalOpen2 && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Contenu de votre modale (formulaire, etc.) */}
            <div className="modal-content">
              <h2 className="titre">Modifier un cours</h2>
              <form className="form" onSubmit={handleEditSubmit}>
                <label className="titre">Code:</label>
                <input
                  type="text"
                  placeholder="saisir code"
                 value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <br></br>
                <label className="titre">Titre:</label>
                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
                <br></br>
                <label className="titre">Description:</label>
                <textarea
                  type="text"
                  placeholder="saisir description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br></br>
                <label className="titre">Document:</label>
                <input
                  type="file"
                  className="titre"
                 
                
                  onChange={(e) => setDocument(e.target.value)}
                />
                <input
  type="text"
  className="selected-file"
  value={document || "Aucun fichier n’a été sélectionné"}
  disabled
/>
                



                <br></br>
                <br></br>
                <button type="submit" >Enregistrer</button>
              </form>
            </div>
            {/* Bouton pour fermer la modal */}
            <button className="modal-close" onClick={closeModal2}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
