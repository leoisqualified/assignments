import express from "express";
import classroomController from "../controllers/classroomController";
import { Router as router } from "express";

router.post("/create", classroomController.create);
