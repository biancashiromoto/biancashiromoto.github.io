export const information = (isLanguagePortuguese: boolean) => ({
  home: {
    timeline: [
      {
        position: isLanguagePortuguese ? "Graduação em Medicina Veterinária" : "Veterinary Medicine Degree",
        location: "FMVZ Unesp | Botucatu/SP",
        date: "mar/11 - nov/15",
        type: "education",
      },
      {
        position: isLanguagePortuguese ? "Residência em Anestesiologia Veterinária" : "Veterinary Anesthesiology Residency",
        location: "FMVZ Unesp | Botucatu/SP",
        date: "mar/16 - mar/18",
        type: "education"
      },
      {
        position: isLanguagePortuguese ? "Medicina Veterinária Intensiva" : "Intensive Care Veterinary Medicine",
        location: "PAV | São Paulo/SP",
        date: "mar/18 - mar/20",
        type: "education"
      },
      {
        position: isLanguagePortuguese ? "Médica Veterinária Anestesista" : "Veterinary anesthesiologist",
        location: "Império dos Animais | Caconde/SP",
        date: isLanguagePortuguese ? "out/18 - dez/19" : "oct/19 - dec/19",
        type: "work"
      },
      {
        position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
        location: "Prime ABC Vet | São Bernardo/SP",
        date: isLanguagePortuguese ? "dez/19 - nov/20" : "dec/19 - nov/20",
        type: "work"
      },
      {
        position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
        location: "Animaniac's | São Paulo/SP",
        date: isLanguagePortuguese ? "dez/20 - mai/21" : "dec/20 - may/21",
        type: "work"
      },
      {
        position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
        location: "Dr. Vet | Santo André/SP",
        date: isLanguagePortuguese ? "mai/21 - set/22" : "may/21 - sep/22",
        type: "work"
      },
      {
        position: isLanguagePortuguese ? "Desenvolvimento Web Full-stack" : "Full-stack Web Development",
        location: "Trybe (Online)",
        date: "jan/23 - mar/24",
        type: "education"
      },
      {
        position: isLanguagePortuguese ? "Consultora de negócios" : "Business Consultant",
        location: "DPSEC | Barueri/SP",
        date: isLanguagePortuguese ? "mar/24 - mai/24" : "mar/24 - may/24",
        type: "work"
      },
      {
        position: isLanguagePortuguese ? "Desenvolvedora Front-end" : "Front-end Developer",
        location: "Webmotors | São Paulo/SP",
        date: isLanguagePortuguese ? "mai/24 - atualmente" : "may/24 - present",
        type: "work"
      },
    ]
    
  }
})

// const timeline = (isLanguagePortuguese: boolean) => ({
//   education: [
//     {
//       position: isLanguagePortuguese ? "Graduação em Medicina Veterinária" : "Veterinary Medicine Degree",
//       location: "FMVZ Unesp | Botucatu/SP",
//       date: "mar/11 - nov/15"
//     },
//     {
//       position: isLanguagePortuguese ? "Residência em Anestesiologia Veterinária" : "Veterinary Anesthesiology Residency",
//       location: "FMVZ Unesp | Botucatu/SP",
//       date: "mar/16 - mar/18",
//       type: isLanguagePortuguese ? `Pós-graduação Lato Sensu` : `Lato Sensu postgraduation`,
//     },
//     {
//       position: isLanguagePortuguese ? "Medicina Veterinária Intensiva" : "Intensive Care Veterinary Medicine",
//       location: "PAV | São Paulo/SP",
//       date: "mar/18 - mar/20",
//       type: isLanguagePortuguese ? `Pós-graduação Strictu Sensu` : `Strictu Sensu postgraduation`,
//     },
//     {
//       position: isLanguagePortuguese ? "Desenvolvimento Web Full-stack" : "Full-stack Web Development",
//       location: "Trybe (Online)",
//       date: "jan/23 - mar/24",
//       type: isLanguagePortuguese ? "Curso de longa duração" : "Long term course",
//     }
//   ],
//   work: [
//     {
//       position: isLanguagePortuguese ? "Médica Veterinária Anestesista" : "Veterinary anesthesiologist",
//       location: "Império dos Animais | Caconde/SP",
//       date: isLanguagePortuguese ? "out/18 - dez/19" : "oct/19 - dec/19",
//     },
//     {
//       position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
//       location: "Prime ABC Vet | São Bernardo/SP",
//       date: isLanguagePortuguese ? "dez/19 - nov/20" : "dec/19 - nov/20",
//     },
//     {
//       position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
//       location: "Animaniac's | São Paulo/SP",
//       date: isLanguagePortuguese ? "dez/20 - mai/21" : "dec/20 - may/21",
//     },
//     {
//       position: isLanguagePortuguese ? "Médica Veterinária Intensivista" : "Critical Care Veterinarian",
//       location: "Dr. Vet | Santo André/SP",
//       date: isLanguagePortuguese ? "mai/21 - set/22" : "may/21 - sep/22",
//     },
//   ]
// })