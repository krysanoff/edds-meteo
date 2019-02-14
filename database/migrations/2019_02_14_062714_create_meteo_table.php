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
            $table->dateTime('created_at');
            $table->double('temperature', 3, 1);
            $table->tinyInteger('wind_min', false, true);
            $table->tinyInteger('wind', false, true);
            $table->tinyInteger('wind_max', false, true);
            $table->smallInteger('wind_dir', false, true);
            $table->smallInteger('pressure', false, true);
            $table->tinyInteger('relative_humidity', false, true);
            $table->primary('created_at');
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
