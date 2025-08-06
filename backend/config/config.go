package config

type Config struct {
	DBPath string `json:"db_path"`
}

func LoadConfig() Config {
	return Config{
		DBPath: "data/fynelo.db",
	}
}
