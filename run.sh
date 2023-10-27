#!/bin/bash


code .

gnome-terminal --tab -- bash -c 'cd client && npm run dev'

gnome-terminal --tab -- bash -c 'cd server && npm run dev'




