import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import PrescriptionCard from "../ResuableCard/PrescriptionCard";
import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Authentication/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDrag = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "prescriptions"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribeSnapshot = onSnapshot(q, (querySnap) => {
          const prescriptions = [];
          querySnap.forEach((doc) => {
            prescriptions.push({ ...doc.data(), id: doc.id });
          });
          setData(prescriptions);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setData([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <p>Loaidng....</p>;
  return (
    <>
      <Box sx={{ p: 3, maxWidth: "1200px", m: "auto" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          color="secondary"
          sx={{
            borderBottom: "3px solid",
            borderColor: "primary.main",
            pb: 1,
            mb: 1,
            mt: 7,
          }}
        >
          My Prescription: {data.length}
        </Typography>
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="data">
            {(provided) => (
              <Grid
                container
                spacing={2}
                sx={{ p: 4, mt: 2 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.map((presc, index) => (
                  <Draggable
                    key={presc.id}
                    draggableId={presc.id}
                    index={index}
                  >
                    {(dragProvided) => (
                      <Grid
                        md={4}
                        key={presc.id}
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        <PrescriptionCard
                          key={presc.id}
                          patientName={presc.patientName}
                          doctorName={presc.doctorName}
                          medicines={presc.medicines}
                          reason={presc.reason}
                          duration={presc.duration}
                          startDate={presc.startDate}
                        />
                      </Grid>
                    )}
                  </Draggable>
                ))}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
};

export default Dashboard;
