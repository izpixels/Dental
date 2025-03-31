<!DOCTYPE html>
<html lang="en">
    <?php
        include 'include/head.common.php';
    ?>
    <body>
        <header class="header">
            <div class="header-top">

               <div class="container">

                <ul class="contact-list" >
                    <li class="contact-item">
                        <ion-icon name="mail-outline"></ion-icon>
                        <a href="gmailto:dentalcare@gmail.com" class="contact-link">elyssaramos17@gmail.com</a>
                    </li>

                    <li class="contact-item">
                        <ion-icon name="call-outline"></ion-icon>
                        <a href="tel:+639151855197" class="contact-link">+63 915 185 5197</a>
                    </li>
                </ul>

                <ul class="social-list">
                    <li>
                        <a href="#" name="logo-facebook">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                    </li>

                    <li>
                        <a href="#" name="logo-intagram">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                    </li>
                </ul>

               </div>

            </div>

            <div class="header-bottom " data-header>
                <div class="container">

                    <a href="#" class="logo"> DentalCare.</a>

                    <nav class="navbar container" data-navbar>
                        <ul class="navbar-list">

                            <li> <a href="#log" class="navbar-link" data-nav-link>Login</a> </li>

                            <li> <a href="#home" class="navbar-link" data-nav-link>Home</a> </li>

                            <li> <a href="#services" class="navbar-link" data-nav-link>Services</a> </li>

                            <li> <a href="#aboutus" class="navbar-link" data-nav-link>About Us</a> </li>

                            <li> <a href="#contact" class="navbar-link" data-nav-link>Contact</a> </li>

                        </ul>
                    </nav>

                    <button class="nav-toggle-btn" aria-label="Toggle Menu" data-nav-toggler>
                        <ion-icon name="menu-sharp" aria-hidden="true" class="menu-icon" ></ion-icon>
                        <ion-icon name="close-sharp" aria-hidden="true" class="close-icon"></ion-icon>
                    </button>

                </div>
            </div>


        </header>

        <main id="home">
            <article>
                <section class="section hero" id="home" style="background-image: url('./images/hero-bg.png')"
                aria-label="hero">

                    <div class="container">
                        <div class="hero-content">

                            <h1 class="h1 hero-title fade-in-scroll1"> We Are Ready To Help & Take Care Of Your Oral Health. </h1>

                            <p class="hero-text fade-in-scroll1">
                                Welcome to the home of healthy smiles!
                                We provide expert dental care with advanced solutions for a brighter,
                                healthier you. Your smile, our priority!
                            </p>

                            <button type="submit" id="registerBtn" class="btn"> Register Now!  </button>

                        </div>

                        <div class="hero-img">
                            <figure class="hero-banner">
                                <img src="./images/hero-banner.png" max-width= 100% height=auto alt="hero banner" class="w-100">
                            </figure>
                        </div>


                    </div>

                </section>

            </article>
        </main>

        <section class="section service" id="services" aria-label="service">
            <div class="container">

                <p class="section-subtitle text-center fade-in-scroll"> Our Services</p>

                <h2 class="h2 section-title text-center fade-in-scroll"> What We Provide </h2>

                <ul class="service-list">

                    <li>
                        <div class="service-card">
                            <div>
                                <h3 class="h3 card-title"> Dental Advisory </h3>

                                <p class="card-text">
                                    A comprehensive dental care to ensure your smile stays healthy, bright, and beautiful.
                                </p>
                            </div>
                        </div>

                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Cleaning </h3>

                                <p class="card-text">
                                    Our dental cleaning service removes plaque and tartar,
                                    leaving your teeth feeling fresh and promoting overall oral health.
                                </p>
                            </div>

                        </div>
                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Extraction </h3>

                                <p class="card-text">
                                    Our tooth extraction service safely removes damaged or problematic teeth,
                                ensuring your comfort and promoting long-term oral health.
                                </p>
                            </div>

                        </div>
                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Braces </h3>

                                <p class="card-text">
                                    Our dental braces service helps straighten teeth,
                                improving both the appearance and function of your smile for lasting results.
                                </p>
                            </div>

                        </div>
                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Restoration </h3>

                                <p class="card-text">
                                    Our dental restoration service restores damaged or decayed teeth using advanced techniques,
                                bringing back both function and natural beauty to your smile.
                                </p>
                            </div>


                        </div>
                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Implant </h3>

                                <p class="card-text">
                                    Our dental implant service provides a durable,
                                natural-looking solution to replace missing teeth, restoring both your smile and confidence.
                                </p>
                            </div>


                        </div>

                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Dentures </h3>

                                <p class="card-text">
                                    Our dental dentures offer a comfortable,
                                    custom-fit solution to replace missing teeth, enhancing both function and appearance for a confident smile.
                                </p>
                            </div>


                        </div>

                    </li>

                    <li>
                        <div class="service-card">

                            <div>
                                <h3 class="h3 card-title"> Dental Whitening </h3>

                                <p class="card-text">
                                    Our dental whitening service brightens your smile by removing
                                    stains and discoloration for a radiant, confident look.
                                </p>
                            </div>


                        </div>

                    </li>

                </ul>

            </div>

        </section>

        <section class="section log" id="log" style="background-image: url('./images/hero-bg.png')"
                aria-label="log">

                <div class="container fade-in-scroll">

                    <p class="section-subtitle "> Healthy, beautiful smiles start here—trust our team to bring out your best! </p>

                    <ul class="log-list">

                        <li>
                            <div class="log-card" onclick="window.location.href='../registration/reg.html'">
                                <div>
                                    <ion-icon name="person-add"></ion-icon>
                                    <h3 class="h3 card-title"> Register </h3>
                                </div>
                            </div>

                        </li>

                        <li>
                            <div class="log-card" onclick="window.location.href='../login/login.php'">
                                <div>
                                    <ion-icon name="lock-open"></ion-icon>
                                    <h3 class="h3 card-title"> Login </h3>
                                </div>
                            </div>
                        </li>

                </div>


        </section>

        <section class="section about" id="aboutus" aria-label="about">
            <div class="container">

                <figure class="about-banner">
                    <img src="./images/about-banner.png" width="100%" height="100%" loading="lazy" alt="about banner" class="w-100">
                </figure>

                <div class="about-content">

                    <p class="section-subtitle fade-in-scroll1"> About Us </p>

                    <h2 class="h2 section-title fade-in-scroll1"> We Care for your Dental Health </h2>

                    <p class="section-text section-text-1">
                        At our clinic, we prioritize your dental health with personalized care and advanced treatments.
                        We understand the importance of a healthy smile, and our team is dedicated to providing comprehensive
                        services that meet your unique needs. Whether it's routine checkups or specialized procedures,
                        we ensure a comfortable experience every time.
                    </p>

                    <p class="section-text">
                        Visit us today and discover how we can help you maintain a bright, healthy smile.
                        Our experts are here to offer the best care and guidance for your dental health.
                        Your smile is our priority!
                    </p>

                </div>

            </div>

        </section>

        <footer class="footer" id="contact">

            <div class="footer-top section">
                <div class="container">

                    <div class="footer-brand">
                        <a href="#home" class="logo1"> DentalCare. </a>
                        <p class="footer-text"> Caring for your smile with expert dental services for a healthier, brighter you. </p>

                        <div class="schedule">
                            <div class="schedule-icon">
                                <ion-icon name="time-outline"></ion-icon>
                            </div>

                            <span class="span"> Monday - Saturday: <br> 9:00am - 10:pm </span>

                        </div>


                    </div>

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title"> Other Links </p>
                        </li>

                        <li>
                            <a href="#home" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Home </span>
                            </a>
                        </li>

                        <li>
                            <a href="#services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Services </span>
                            </a>
                        </li>

                        <li>
                            <a href="#aboutus" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span" > About Us </span>
                            </a>
                        </li>

                    </ul>

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title"> Our Services </p>
                        </li>

                        <li>
                            <a href="services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Dental Advisory </span>
                            </a>
                        </li>

                        <li>
                            <a href="#services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Dental Cleaning</span>
                            </a>
                        </li>

                        <li>
                            <a href="#services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Dental Extraction </span>
                            </a>
                        </li>

                        <li>
                            <a href="#services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> Dental Braces </span>
                            </a>
                        </li>

                        <li>
                            <a href="#services" class="footer-link">
                                <ion-icon name="add-outline"></ion-icon>

                                <span class="span"> See More </span>
                            </a>
                        </li>

                    </ul>

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title"> Contact Us </p>
                        </li>

                        <li class="footer-item">
                            <div class="item-icon">
                                <ion-icon name="location-outline"></ion-icon>
                            </div>

                            <address class="item-text">
                                2nd Floor M.B. Giron Building, Gov Fortunato Halili Rd <br>
                                San Jose Del Monte, Bulacan
                            </address>
                        </li>

                        <li class="footer-item">
                            <div class="item-icon">
                                <ion-icon name="call-outline"></ion-icon>
                            </div>

                            <a href="tel:+9151855197" class="footer-link">+63-9151-855-197</a>
                        </li>

                        <li class="footer-item">
                            <div class="item-icon">
                                <ion-icon name="mail-outline"></ion-icon>
                            </div>

                            <a href="mailto:elyssaramos17@gmail.com" class="footer-link">elyssaramos17@gmail.com</a>
                        </li>

                    </ul>

                </div>
            </div>

            <div class="footer-bottom">
                <div class="container">
                    <p class="copyright"> &copy; 2025 All Rights Reserved by BSIT4-2 </p>
                </div>
            </div>

        </footer>






        <script>
            document.addEventListener("DOMContentLoaded", function() {
                document.getElementById("registerBtn").addEventListener("click", function() {
                    window.location.href = "/Dental/registration/reg.html";
                });
            });
        </script>

        <script src="script.js" defer></script>

        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </body>
</html>