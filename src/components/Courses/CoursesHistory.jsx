// AppliedCoursesList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { Button, Spacer, Box, Text, VStack, Center } from '@chakra-ui/react';

const AppliedCoursesList = ({ db }) => {
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedCourses = async () => {
    try {
      // Fetch user courses from Firestore
      const userEmail = localStorage.getItem('email');
      const userCoursesCollection = collection(db, 'users');
      const userCourseRef = doc(userCoursesCollection, userEmail);
      const userCourseDoc = await getDoc(userCourseRef);

      if (userCourseDoc.exists()) {
        const userData = userCourseDoc.data();
        // Assuming courses is an array of objects with title and declared properties
        const courses = userData.courses || [];
        const filteredCourses = courses.filter(course => course.declared === 1);
        setAppliedCourses(filteredCourses.map(course => ({ title: course.title, status: 'ΕΓΓΕΓΡΑΜΜΕΝΟΣ' })));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching applied courses:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedCourses();
  }, [db]);

  const handleDeleteCourse = async (courseTitle) => {
    try {
      const userEmail = localStorage.getItem('email');
      const userCoursesCollection = collection(db, 'users');
      const userCourseRef = doc(userCoursesCollection, userEmail);
  
      // Fetch the current user document
      const userCourseDoc = await getDoc(userCourseRef);
      const courses = userCourseDoc.data().courses || [];
  
      // Find the course with the specified title and declared: 1
      const courseToRemove = courses.find(course => course.title === courseTitle && course.declared === 1);
  
      if (courseToRemove) {
        // Remove the course with declared: 1
        await updateDoc(userCourseRef, {
          courses: arrayRemove(courseToRemove),
        });
  
        console.log(`Course with title "${courseTitle}" removed from declared courses.`);
  
        // Update the course to reapply with declared: -1
        const courseToReapply = { ...courseToRemove, declared: -1 };
        await updateDoc(userCourseRef, {
          courses: arrayUnion(courseToReapply),
        });
  
        console.log(`Course with title "${courseTitle}" re-applied with declared -1.`);
      } else {
        console.log(`Course with title "${courseTitle}" not found in declared courses.`);
      }
  
      // Refetch applied courses after deletion
      fetchAppliedCourses();
    } catch (error) {
      console.error('Error deleting course:', error.message);
    }
  };
  
  
  
  
  

  return (
    <Center>
      <VStack marginRight="200px" align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="800px" mt={100}>
        <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white">
          ΔΗΛΩΣΕΙΣ
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : appliedCourses.length === 0 ? (
          <Text>ΔΕΝ ΕΧΕΤΕ ΚΑΜΙΑ ΔΗΛΩΣΗ.</Text>
        ) : (
          <VStack align="start" spacing={2} w="100%">
            {appliedCourses.map((course, index) => (
              <Box key={index} borderWidth="2px" borderRadius="md" p={2} w="150%" display="flex" justifyContent="space-between">
                <Text fontSize="large" fontWeight="bold">{course.title}</Text>
                <Box>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteCourse(course.title)}>
                    ΔΙΑΓΡΑΦΗ
                  </Button>
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
      <Box bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" position="absolute" top={210} left={20}>
        <Button bg="#26abcc" color="white" onClick={() => window.location.href = "/courses"}>
          ΝΕΑ ΔΗΛΩΣΗ
        </Button>
      </Box>  
    </Center>
  );
};

export default AppliedCoursesList;



