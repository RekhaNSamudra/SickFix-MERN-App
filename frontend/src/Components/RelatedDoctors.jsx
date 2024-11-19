import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import DocCard from "./DocCard";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDocs, setRelatedDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const relDocs = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelatedDocs(relDocs);
    }
  }, [docId, speciality, doctors]);

  return (
    <center className="mt-10 text-center md:text-start">
      <div className="text-3xl font-medium">Related Doctors</div>
      <p className="text-lg text-gray-700 mt-3">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-auto gap-8 pt-5 gap-y-6 px-3 sm:px-0 mt-5">
        {relatedDocs.map((item, index) => (
          <DocCard item={item} key={index} />
        ))}
      </div>
    </center>
  );
};

export default RelatedDoctors;
