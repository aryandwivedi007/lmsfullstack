import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Module {
  _id: string;
  title: string;
  contentType: "TEXT" | "VIDEO" | "PDF" | "LINK";
  content?: string;
}

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  if (modules.length === 0) {
    return <Typography color="textSecondary">No modules available.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {modules.map((module) => (
        <Card key={module._id} sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {module.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Type: {module.contentType}
            </Typography>
            {module.content && (
              <Typography variant="body2" color="textSecondary" mt={1}>
                {module.content}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ModuleList;
