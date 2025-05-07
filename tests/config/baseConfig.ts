// If needed the user credential is to be extracted and saved here
export interface RoleCredentials {
  username: string;
  password: string;
}

export interface BaseConfig {
  baseUrl: string;
  roles: {
    [role: string]: RoleCredentials;
  };
}

export const getCoverGoConfig = (
  role: string,
): BaseConfig & RoleCredentials => {
  const config: BaseConfig = {
    baseUrl: process.env.CoverGo_Prod_URL || "",
    roles: {
      baseUser: {
        username: process.env.CoverGo_ADMIN_USERNAME || "",
        password: process.env.CoverGo_ADMIN_PASSWORD || "",
      },
    },
  };
  if (!config.roles[role]) {
    throw new Error(`Role "${role}" is not defined for CoverGo Base"`);
  }
  return { ...config, ...config.roles[role] };
};

export function getCustomerConfig(
  customer: string,
  role: string,
): BaseConfig & RoleCredentials {
  switch (customer) {
    case "InsuranceCompanyOne": {
      const config: BaseConfig = {
        baseUrl: process.env.ICO_UAT_URL || "",
        roles: {
          claimsRepMsrs: {
            username: process.env.ICO_CoverGo_ADMIN_USERNAME || "",
            password: process.env.ICO_CoverGo_ADMIN_PASSWORD || "",
          },
        },
      };
      if (!config.roles[role]) {
        throw new Error(
          `Role "${role}" is not defined for customer "${customer}"`,
        );
      }
      return { ...config, ...config.roles[role] };
    }
    case "InsuranceCompanyTwo": {
      const config: BaseConfig = {
        baseUrl: process.env.ICT_UAT_URL || "",
        roles: {
          claimsManager: {
            username: process.env.ICT_CoverGo_ADMIN_USERNAME || "",
            password: process.env.ICT_CoverGo_ADMIN_PASSWORD || "",
          },
        },
      };
      if (!config.roles[role]) {
        throw new Error(
          `Role "${role}" is not defined for customer "${customer}"`,
        );
      }
      return { ...config, ...config.roles[role] };
    }
    // Add more Config as needed
    default:
      throw new Error(`Unknown customer: ${customer}`);
  }
}
