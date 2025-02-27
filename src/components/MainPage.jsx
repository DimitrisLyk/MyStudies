import { Flex, Image, Card, Text, CardHeader, CardBody, Heading, Button, CardFooter} from "@chakra-ui/react";
import React from "react";
import bg from "..//images/bg.jpg";
import book from "..//images/book.jpg";
import certificate from "..//images/certificate.jpg";
import grade from "..//images/grade.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Mainpage = () => {
    const handleLoginClick = () => {
        // Change the window location to the desired page
        window.location.href = "/login";
    };

    const name = localStorage.getItem("name");

    const isLoggedIn = localStorage.getItem("role") == null;
    
    return (
        <Flex justifyContent="center" alignItems="center" flexDirection="column" bgImage={bg} bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
            <div id="carouselExampleCaptions" className="carousel slide" style={{ marginTop: '30px', width: '1000px' , height: '600px' }}>
                <div className="carousel-inner">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-item active">
                        <a href="/courses">
                            <Image src={book} className="d-block w-100" alt="First slide" style={{ objectFit: 'cover', height: '500px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 style={{color: 'white' , fontWeight: 'bold'}}>ΔΗΛΩΣΕΙΣ</h3>
                                <p style={{color: 'white', fontWeight: 'bold'}}>Δηλώστε τα μαθήματα σας για το τρέχον εξάμηνο.</p>
                            </div>
                        </a>
                    </div>
                    <div className="carousel-item">
                        <a href="/grades">
                            <Image src={grade} className="d-block w-100" alt="Second slide" style={{ objectFit: 'cover', height: '500px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 style={{color: 'black' , fontWeight: 'bold'}}>ΒΑΘΜΟΛΟΓΙΕΣ</h3>
                                <p style={{color: 'black' , fontWeight: 'bold'}}>Δείτε τις βαθμολογίες σας για τα μαθήματα που έχετε εξεταστεί.</p>
                            </div>
                        </a>
                    </div>
                    <div className="carousel-item">
                        <a href="/certificateslist">
                            <Image src={certificate} className="d-block w-100" alt="Second slide" style={{ objectFit: 'cover', height: '500px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 style={{color: 'black' , fontWeight: 'bold'}}>ΠΙΣΤΟΠΟΙΗΤΙΚΑ</h3>
                                <p style={{color: 'black' , fontWeight: 'bold'}}>Κάντε αίτηση πιστοποιητικών για τις σπουδές σας.</p>
                            </div>
                        </a>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" style={{ backgroundColor: 'grey' , height: "500px" , width: "50px"}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"  data-bs-target="#carouselExampleCaptions" data-bs-slide="next" style={{ backgroundColor: 'grey' , height: "500px" , width: "50px"}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {isLoggedIn ? ( 
                <div style={{marginBottom: '40px'}}>
                    <Flex >
                        <Card marginRight="50px" style={{ width: '400px'}}>
                            <CardHeader>
                            <Heading size='md'> Για τους φοιτητές/τριες:</Heading>
                            </CardHeader>
                            <CardBody>
                            <Text>	
                                • Να δουν το Πρόγραμμα Σπουδών του Τμήματός τους
                            </Text>
                            <Text>
                                • Να κάνουν δήλωση μαθημάτων
                            </Text>
                            <Text>
                                • Να δουν τη βαθμολογία τους
                            </Text>
                            <Text>
                                • Να κάνουν αίτηση για την έκδοση πιστοποιητικών
                            </Text>
                            </CardBody>
                            <CardFooter>
                            <Button bg="#26abcc" color="white" onClick={handleLoginClick} >ΣΥΝΔΕΣΗ</Button>
                            </CardFooter>
                        </Card>
                        <Card marginRight="100px" style={{ width: '400px'}}>
                            <CardHeader>
                            <Heading size='md'> Για τους καθηγητές/τριες:</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>	
                                    • Να δημιουργήσουν νέο βαθμολόγιο
                                </Text>
                                <Text>
                                    • Να επεξεργαστούν και να οριστικοποιήσουν τα βαθμολογία τους
                                </Text>
                            </CardBody>
                            <CardFooter>
                            <Button bg="#26abcc" color="white" onClick={handleLoginClick}>ΣΥΝΔΕΣΗ</Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </div>
            ) : (
                <Card style={{ marginBottom: '30px', width: '1000px'}}>
                    <CardHeader>
                    <Heading size='md'> Καλησπέρα {name}. Στο mystudies μπορείς:</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text>	
                        • Να δεις το Πρόγραμμα Σπουδών του Τμήματος 
                    </Text>
                    <Text>
                        • Να κάνεις δήλωση μαθημάτων
                    </Text>
                    <Text>
                        • Να δεις τη βαθμολογία σου
                    </Text>
                    <Text>
                        • Να κάνεις αίτηση για την έκδοση πιστοποιητικών
                    </Text>
                    </CardBody>
                </Card>
                )}
            </Flex>    
    );
}

export default Mainpage;