import express, { Request, Response } from "express";
import { EnsureAuthenticated } from "./auth"
import { AppUser, Team } from "../models/user";

export const dataRouter = express.Router();

dataRouter.post("/", EnsureAuthenticated, async (req: Request, res: Response) => {

    // I have added a delay to this to show how the interface can wait for the response
    setTimeout(() => {
        var results = [];

        const page = req.body.page || 1;
        const itemsPerPage = req.body.itemsPerPage || 10;
        const start = (page - 1) * itemsPerPage;
        const sortBy = req.body.sortBy || []; // capable of sort by multiple columns
        const sortDesc = req.body.sortDesc || []; // likewise
        var search = req.query.search;
        var searchTerm = "";


        for (var i = 0; i < 10000; i++) {
            results.push({ id: i, name: "testing" + i })
        }

        if (search) {
            searchTerm = search.toString().trim();

            results = results.filter(item => { return item.name.indexOf(searchTerm) >= 0; })
        }


        if (sortBy.length > 0) {
            const sorter = sortBy[0];

            if (sorter == "id") {
                if (sortDesc[0])
                    results = results.sort((a, b) => { return a.id - b.id; })
                else
                    results = results.sort((a, b) => { return b.id - a.id; })
            }
            else if (sorter == "name") {
                if (sortDesc[0])
                    results = results.sort((a, b) => { return a.name.localeCompare(b.name); })
                else
                    results = results.sort((a, b) => { return b.name.localeCompare(a.name); })
            }
        }

        res.send({ data: results.slice(start, start + itemsPerPage), meta: { count: results.length } });

    }, 1000);
});
