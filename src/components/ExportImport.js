// 'use client';

// import React, { useRef } from 'react';

// export default function ExportImport({ students, onImportSuccess }) {
//   const fileInputRef = useRef(null);

//   // Export to CSV
//   const handleExportCSV = () => {
//     if (students.length === 0) {
//       alert('No students to export');
//       return;
//     }

//     // CSV headers
//     const headers = [
//       'Name',
//       'Grade',
//       'Division',
//       'Roll Number',
//       'Phone',
//       'WhatsApp',
//       'Email',
//       'Father Name',
//       'Mother Name',
//       'Residing Country',
//       'Home Address',
//       'GCC Address',
//       'Status',
//     ];

//     // CSV data rows
//     const rows = students.map((student) => [
//       student.name || '',
//       student.grade || '',
//       student.division || '',
//       student.rollNumber || '',
//       student.phone || '',
//       student.whatsappNumber || '',
//       student.email || '',
//       student.fatherName || '',
//       student.motherName || '',
//       student.residingCountry || '',
//       student.homeAddress || '',
//       student.gccAddress || '',
//       student.status || 'Active',
//     ]);

//     // Create CSV content
//     const csvContent = [
//       headers.map((h) => `"${h}"`).join(','),
//       ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
//     ].join('\n');

//     // Download CSV file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Import from CSV
//   const handleImportCSV = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       try {
//         const csv = event.target.result;
//         const lines = csv.split('\n').filter((line) => line.trim());

//         if (lines.length < 2) {
//           alert('CSV file is empty');
//           return;
//         }

//         // Parse CSV
//         const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim().toLowerCase());
//         const students = [];

//         for (let i = 1; i < lines.length; i++) {
//           const line = lines[i];
//           // Simple CSV parsing (handles basic cases)
//           const values = line.split(',').map((v) => v.replace(/"/g, '').trim());

//           if (values.length < 3) continue; // Skip invalid rows

//           const student = {
//             name: values[headers.indexOf('name')] || '',
//             grade: values[headers.indexOf('grade')] || '',
//             division: values[headers.indexOf('division')] || '',
//             rollNumber: values[headers.indexOf('roll number')] || '',
//             phone: values[headers.indexOf('phone')] || '',
//             whatsappNumber: values[headers.indexOf('whatsapp')] || '',
//             email: values[headers.indexOf('email')] || '',
//             fatherName: values[headers.indexOf('father name')] || '',
//             motherName: values[headers.indexOf('mother name')] || '',
//             residingCountry: values[headers.indexOf('residing country')] || '',
//             homeAddress: values[headers.indexOf('home address')] || '',
//             gccAddress: values[headers.indexOf('gcc address')] || '',
//             status: values[headers.indexOf('status')] || 'Active',
//           };

//           // Validate required fields
//           if (student.name && student.grade) {
//             students.push(student);
//           }
//         }

//         if (students.length === 0) {
//           alert('No valid students found in CSV');
//           return;
//         }

//         onImportSuccess(students);
//       } catch (error) {
//         alert('Error parsing CSV: ' + (error instanceof Error ? error.message : String(error)));
//       }
//     };

//     reader.readAsText(file);
//     e.target.value = ''; // Reset file input
//   };

//   return (
//     <div className="flex gap-3">
//       {/* Export Button */}
//       <button
//         onClick={handleExportCSV}
//         className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
//       >
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//         </svg>
//         Export CSV
//       </button>

//       {/* Import Button */}
//       <div>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".csv"
//           onChange={handleImportCSV}
//           className="hidden"
//         />
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-9-2 9 18 9-18-9 2zm0 0V8m0 0L7 11m5-3l5 3" />
//           </svg>
//           Import CSV
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useRef, useState } from 'react';
import Papa from 'papaparse'; // Recommended: Import papaparse

export default function ExportImport({ students, onImportSuccess }) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Configuration ---
  // Mapping Internal Keys to CSV Headers for consistency
  const csvMap = {
    name: 'Name',
    grade: 'Grade',
    division: 'Division',
    rollNumber: 'Roll Number',
    phone: 'Phone',
    whatsappNumber: 'WhatsApp',
    email: 'Email',
    fatherName: 'Father Name',
    motherName: 'Mother Name',
    residingCountry: 'Residing Country',
    homeAddress: 'Home Address',
    gccAddress: 'GCC Address',
    status: 'Status',
  };

  // --- Export Logic ---
  const handleExportCSV = () => {
    if (!students || students.length === 0) {
      alert('No students to export');
      return;
    }

    try {
      // 1. Format data for export
      const dataToExport = students.map((student) => {
        const row = {};
        Object.keys(csvMap).forEach((key) => {
          // Use the header name as key, and ensure value is string
          row[csvMap[key]] = student[key] || '';
        });
        return row;
      });

      // 2. Generate CSV using PapaParse (Handles quotes/commas automatically)
      const csv = Papa.unparse(dataToExport);

      // 3. Trigger Download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `students_export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export CSV.');
    }
  };

  // --- Import Logic ---
  const handleImportCSV = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    Papa.parse(file, {
      header: true, // Automatically converts CSV to Array of Objects
      skipEmptyLines: true,
      complete: (results) => {
        const { data, errors } = results;

        if (errors.length > 0) {
          console.warn('CSV Parse Warnings:', errors);
        }

        if (!data || data.length === 0) {
          alert('CSV file appears empty or invalid.');
          setIsProcessing(false);
          return;
        }

        // Normalize Keys (CSV Headers -> Internal Keys)
        // We create a reverse map for lookup: { "Name": "name", "Grade": "grade" }
        const reverseMap = Object.fromEntries(
          Object.entries(csvMap).map(([k, v]) => [v.toLowerCase(), k])
        );

        const validStudents = [];

        data.forEach((row, index) => {
          const student = {};
          
          // Map CSV columns to internal state keys
          Object.keys(row).forEach((colHeader) => {
            const cleanHeader = colHeader.trim().toLowerCase();
            const internalKey = reverseMap[cleanHeader];
            
            if (internalKey) {
              student[internalKey] = row[colHeader]?.trim();
            }
          });

          // Validation
          if (student.name && student.grade) {
            // Set defaults if missing
            student.status = student.status || 'Active'; 
            validStudents.push(student);
          }
        });

        if (validStudents.length === 0) {
          alert('No valid rows found. Please check CSV headers.');
        } else {
          onImportSuccess(validStudents);
        }
        
        // Cleanup
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsProcessing(false);
      },
      error: (err) => {
        alert('Error parsing CSV file.');
        console.error(err);
        setIsProcessing(false);
      }
    });
  };

  return (
    <div className="flex gap-3">
      {/* Export Button */}
      <button
        onClick={handleExportCSV}
        disabled={isProcessing}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Export CSV
      </button>

      {/* Import Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImportCSV}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-200"
        >
          {isProcessing ? (
             <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-9-2 9 18 9-18-9 2zm0 0V8m0 0L7 11m5-3l5 3" />
            </svg>
          )}
          {isProcessing ? 'Processing...' : 'Import CSV'}
        </button>
      </div>
    </div>
  );
}