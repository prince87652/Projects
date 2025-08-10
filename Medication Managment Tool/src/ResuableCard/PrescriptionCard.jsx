import { Box, Card, CardContent, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MedicationInfo from "./MedicationInfo";
import DoctorInfo from "./DoctorInfo";
import ButtonAct from "./ButtonAct";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useSafeLayoutEffect } from "@chakra-ui/react";

const PrescriptionCard = ({
  patientName,
  doctorName,
  medicines,
  reason,
  duration,
  startDate,
}) => {
  const [medList, setMedList] = useState(medicines || []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(medList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMedList(items);
  };
  useEffect(() => {
    setMedList(medicines || []);
  }, [medicines]);
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        boxShadow: 4,
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(180deg, #ffffff, #f7f9fc)",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="medList">
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <DoctorInfo
                patientName={patientName}
                doctorName={doctorName}
                reason={reason}
                startDate={startDate}
              />

              {medList.map((med, index) => (
                <Draggable key={med.id} draggableId={med.id} index={index}>
                  {(dragProvided) => (
                    <Paper
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      sx={{
                        padding: 2,
                        backgroundColor: snapshot.isDragging
                          ? "#e3f2fd"
                          : "#ffffff",
                        borderRadius: 2,
                        boxShadow: snapshot.isDragging
                          ? "0 4px 12px rgba(0,0,0,0.2)"
                          : "0 1px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s ease",
                        cursor: "grab",
                        "&:hover": {
                          backgroundColor: "#f1f8ff",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <MedicationInfo
                        medicineName={med.name}
                        dosage={med.dosage}
                        schedule={med.schedule}
                      />
                      <ButtonAct />
                    </Paper>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};

export default PrescriptionCard;
