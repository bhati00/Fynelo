package config

type RedisConfig struct {
	Host     string `json:"host"`
	Port     string `json:"port"`
	Password string `json:"password"`
	DB       int    `json:"db"`
}
type Config struct {
	DBPath string      `json:"db_path"`
	Redis  RedisConfig `json:"redis"`
}

func LoadConfig() Config {
	return Config{
		DBPath: "data/fynelo.db",
		Redis: RedisConfig{
			Host:     "localhost",
			Port:     "6379",
			Password: "", // No password for local development
			DB:       0,  // Default Redis DB
		},
	}
}
