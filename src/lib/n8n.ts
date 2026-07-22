const N8N_URL = import.meta.env.VITE_N8N_URL

export const triggerPatientCheckin = async (patientData: {
  patient_id: string
  clinic_id: string
  full_name: string
  email: string
  medication: string
  clinic_name: string
}) => {
  try {
    const response = await fetch(`${N8N_URL}/webhook/patient-checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })

    if (!response.ok) {
      console.error("Failed to trigger n8n workflow")
      return false
    }

    return true
  } catch (error) {
    console.error("n8n trigger error:", error)
    return false
  }
}