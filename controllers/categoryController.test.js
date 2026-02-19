import categoryModel from "../models/categoryModel";
import slugify from "slugify";

import {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController
} from "./categoryController";

jest.mock("../models/categoryModel")
jest.mock("slugify")

describe('createCategoryController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
});