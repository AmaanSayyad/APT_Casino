import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCoins, FaBomb, FaDice, FaCog, FaExchangeAlt, FaTimes, FaAngleUp, FaAngleDown, FaInfoCircle } from "react-icons/fa";
import CustomSelect from "@/components/CustomSelect";
import CustomInput from "@/components/CustomInput";
import { motion } from "framer-motion";

const DynamicForm = ({ config, onSubmit }) => {
  // State to manage form values
  const [formData, setFormData] = useState({});
  const [expanded, setExpanded] = useState(true);
  
  // Initialize form with default values from config
  useEffect(() => {
    const initialData = {};
    config.fields.forEach(field => {
      initialData[field.id] = field.defaultValue !== undefined 
        ? field.defaultValue 
        : field.type === "multiSelect" ? [] : "";
    });
    setFormData(initialData);
  }, [config]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle multi-select changes
  const handleMultiSelectChange = (name, selectedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Group fields for better organization in auto mode
  const getFieldGroups = () => {
    if (config.submitButton !== "Start Auto Betting") {
      return { main: config.fields };
    }
    
    return {
      main: config.fields.slice(0, 3),
      advanced: config.fields.slice(3)
    };
  };
  
  const fieldGroups = getFieldGroups();
  const isAutoMode = config.submitButton === "Start Auto Betting";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl shadow-xl overflow-hidden bg-[#1A0015] border border-gray-800"
    >
      {/* Form Header */}
      <div className="bg-[#110015] p-4 flex justify-between items-center cursor-pointer" onClick={toggleExpanded}>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-900/30 mr-3">
            {isAutoMode ? <FaCog className="text-purple-300" /> : <FaDice className="text-purple-300" />}
          </div>
          <div>
            <h3 className="text-white font-medium">{isAutoMode ? "Auto Betting" : "Manual Betting"}</h3>
            <p className="text-white/60 text-xs">
              {isAutoMode ? "Configure auto betting parameters" : "Place individual bets manually"}
            </p>
          </div>
        </div>
        <button className="p-2 text-white/60 hover:text-white">
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      
      {/* Form Body */}
      {expanded && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Main Fields */}
          <div className="space-y-4">
            {fieldGroups.main.map((field) => (
              <div key={field.id} className="relative">
                {/* Add icons for better UX */}
                <div className="absolute top-8 left-3 text-purple-400 z-10">
                  {field.id === "betAmount" && <FaCoins />}
                  {field.id === "mines" && <FaBomb />}
                  {field.id === "tilesToReveal" && <FaDice />}
                </div>
                
                {field.type === "singleSelect" && (
                  <CustomSelect
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    label={field.label}
                    options={field.options}
                    className="pl-8" // Add padding for icons
                  />
                )}

                {field.type === "text" && (
                  <CustomInput
                    type="text"
                    label={field.label}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    className="pl-8" // Add padding for icons
                  />
                )}

                {field.type === "number" && (
                  <CustomInput
                    type="number"
                    label={field.label}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    className="pl-8" // Add padding for icons
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Advanced Fields for Auto Mode */}
          {isAutoMode && fieldGroups.advanced && fieldGroups.advanced.length > 0 && (
            <div className="pt-4 border-t border-gray-800">
              <div className="mb-3 text-purple-400 text-sm font-medium flex items-center">
                <FaCog className="mr-1" /> Advanced Settings
              </div>
              <div className="space-y-4">
                {fieldGroups.advanced.map((field) => (
                  <div key={field.id} className="relative">
                    {/* Add icons for advanced settings */}
                    <div className="absolute top-8 left-3 text-purple-400 z-10">
                      {field.id.includes("on") && <FaExchangeAlt />}
                      {field.id.includes("stop") && <FaTimes />}
                      {field.id === "numberOfBets" && <FaDice />}
                    </div>
                    
                    {field.type === "singleSelect" && (
                      <CustomSelect
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleChange}
                        label={field.label}
                        options={field.options}
                        className="pl-8" // Add padding for icons
                      />
                    )}

                    {field.type === "text" && (
                      <CustomInput
                        type="text"
                        label={field.label}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder || ""}
                        className="pl-8" // Add padding for icons
                      />
                    )}

                    {field.type === "number" && (
                      <CustomInput
                        type="number"
                        label={field.label}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder || ""}
                        className="pl-8" // Add padding for icons
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            onClick={handleSubmit}
            className={`w-full py-3 ${
              isAutoMode 
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            } rounded-lg text-white font-semibold shadow-lg transition-all flex items-center justify-center`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isAutoMode && (
              <span className="inline-flex items-center mr-2">🤖</span>
            )}
            <span>{isAutoMode ? "START AUTO BETTING" : "PLACE BET"}</span>
            <FaArrowRight className="ml-2" />
          </motion.button>
          
          {/* How to Play Info */}
          <div className="mt-2 p-3 bg-black/20 rounded-lg">
            <div className="text-xs text-white/60 flex items-start">
              <FaInfoCircle className="text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                {isAutoMode ? (
                  <span>
                    <strong>Auto Mode:</strong> Set mines, bet amount, and number of tiles to reveal. 
                    The system will automatically place bets and cash out according to your settings.
                  </span>
                ) : (
                  <span>
                    <strong>Manual Mode:</strong> Set mines and bet amount, then click tiles yourself to reveal gems.
                    You control when to cash out your winnings.
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default DynamicForm;
