"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterFilterableFields = exports.academicSemesterSearchableFields = exports.academicSemesterTitleCodeMapper = exports.academiSemesterCode = exports.academicSemesterTitles = exports.academicSemesterMonths = void 0;
exports.academicSemesterMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.academicSemesterTitles = [
    'Autum',
    'Summer',
    'Fall',
];
exports.academiSemesterCode = ['01', '02', '03'];
exports.academicSemesterTitleCodeMapper = {
    Autum: '01',
    Summer: '02',
    Fall: '03',
};
exports.academicSemesterSearchableFields = ['title', 'code', 'year'];
exports.academicSemesterFilterableFields = [
    'searchTerm',
    'title',
    'code',
    'year',
];
