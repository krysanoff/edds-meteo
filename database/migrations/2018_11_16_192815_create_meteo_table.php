<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeteoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meteo', function (Blueprint $table) {
            $table->dateTime('created_at')->unique()->index();
            $table->float('temperature', 3, 1);
            $table->tinyInteger('wind_min');
            $table->tinyInteger('wind');
            $table->tinyInteger('wind_max');
            $table->smallInteger('wind_dir');
            $table->float('pressure', 5, 1);
            $table->float('relative_humidity', 4, 1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meteo');
    }
}
